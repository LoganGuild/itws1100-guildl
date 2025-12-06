<?php
include('includes/init.inc.php');
include('includes/config.inc.php');
include('includes/functions.inc.php');

// -------------------------------------------------------------------
// Helper to clean user input
// -------------------------------------------------------------------
function clean_input($value) {
    $value = trim($value ?? "");
    $value = strip_tags($value);
    return $value;
}

// -------------------------------------------------------------------
// INITIAL VALUES
// -------------------------------------------------------------------
$errors = [];
$successMessage = "";

$name    = "";
$email   = "";
$comment = "";
$feature = "";

// -------------------------------------------------------------------
// HANDLE FORM SUBMISSION (POST)
// -------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get and clean form data
    $name    = clean_input($_POST['name'] ?? "");
    $email   = clean_input($_POST['email'] ?? "");
    $comment = clean_input($_POST['comment'] ?? "");
    $feature = clean_input($_POST['feature'] ?? "");

    // ---- Server-side validation ----
    if ($name === "") {
        $errors[] = "Name is required.";
    }

    if ($email === "") {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please enter a valid email address.";
    }

    if ($comment === "") {
        $errors[] = "Comment is required.";
    }

    if (empty($errors)) {
        $sql = "INSERT INTO comments (name, email, comment, feature, status)
                VALUES (?, ?, ?, ?, 'approved')";

        $statement = $db->prepare($sql);

        if (!$statement) {
            $errors[] = "Database error: unable to prepare insert statement.";
        } else {
            $statement->bind_param("ssss", $name, $email, $comment, $feature);

            if ($statement->execute()) {
                $successMessage = "Thanks! Your comment has been submitted.";
                $name = $email = $comment = $feature = "";
            } else {
                $errors[] = "Database error: unable to save your comment.";
            }

            $statement->close();
        }
    }
}

// -------------------------------------------------------------------
// FETCH APPROVED COMMENTS (newest first)
// -------------------------------------------------------------------
$comments = [];

$sql = "SELECT name, email, comment, feature, time
        FROM comments
        WHERE status = ?
        ORDER BY time DESC";

$status = "approved";

$statement = $db->prepare($sql);

if ($statement) {
    $statement->bind_param("s", $status);
    $statement->execute();
    $result = $statement->get_result();

    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }

    $result->free();
    $statement->close();
} else {
    $errors[] = "Database error: unable to load comments.";
}
?>

<title>Comment Submission Form</title>

<?php
include('includes/head.inc.php');
?>

<h1>Visitor Comments</h1>

<?php include('includes/menubody.inc.php'); ?>

<!-- DISPLAY SECTION -->
<?php if (!empty($comments)): ?>

    <?php foreach ($comments as $c): ?>
        <div>
            <strong>
                <?php echo htmlspecialchars($c['name'], ENT_QUOTES, 'UTF-8'); ?>
            </strong>
            <span>
                (<?php echo date("F j, Y, g:i a", strtotime($c['time'])); ?>)
            </span>
            <div>
                <?php
                echo nl2br(
                    htmlspecialchars($c['comment'], ENT_QUOTES, 'UTF-8')
                );
                ?>
            </div>

            <?php if (!empty($c['feature'])): ?>
                <div>
                    <em>Feature suggestion:</em>
                    <?php
                    echo nl2br(
                        htmlspecialchars($c['feature'], ENT_QUOTES, 'UTF-8')
                    );
                    ?>
                </div>
            <?php endif; ?>

            <hr>
        </div>
    <?php endforeach; ?>

<?php else: ?>

    <p>No comments yet. Be the first to leave one!</p>

<?php endif; ?>

<!-- SUBMISSION FORM -->
<h2>Leave a Comment</h2>

<?php if (!empty($errors)): ?>
    <?php foreach ($errors as $err): ?>
        <p style="color:red;">
            <?php echo htmlspecialchars($err, ENT_QUOTES, 'UTF-8'); ?>
        </p>
    <?php endforeach; ?>
<?php endif; ?>

<?php if ($successMessage): ?>
    <p style="color:green;">
        <?php echo htmlspecialchars($successMessage, ENT_QUOTES, 'UTF-8'); ?>
    </p>
<?php endif; ?>

<form method="post" action="comments.php">
    <p>
        <label for="name">Name *</label><br>
        <input
            type="text"
            id="name"
            name="name"
            value="<?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); ?>"
        >
    </p>

    <p>
        <label for="email">Email *</label><br>
        <input
            type="email"
            id="email"
            name="email"
            value="<?php echo htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); ?>"
        >
    </p>

    <p>
        <label for="comment">Comment *</label><br>
        <textarea
            id="comment"
            name="comment"
            rows="4"
            cols="40"
        ><?php echo htmlspecialchars($comment, ENT_QUOTES, 'UTF-8'); ?></textarea>
    </p>

    <p>
        <label for="feature">Feature Suggestion (optional)</label><br>
        <textarea
            id="feature"
            name="feature"
            rows="3"
            cols="40"
        ><?php echo htmlspecialchars($feature, ENT_QUOTES, 'UTF-8'); ?></textarea>
    </p>

    <p>
        <button type="submit">Submit Comment</button>
    </p>
</form>

<?php include('includes/foot.inc.php'); ?>
