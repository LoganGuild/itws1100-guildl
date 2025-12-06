<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

mysqli_report(MYSQLI_REPORT_OFF);

include('includes/init.inc.php');
include('includes/config.inc.php');
include('includes/functions.inc.php');

$dbOk = false;

@$db = new mysqli(
    $GLOBALS['DB_HOST'],
    $GLOBALS['DB_USERNAME'],
    $GLOBALS['DB_PASSWORD'],
    $GLOBALS['DB_NAME']
);

if ($db->connect_error) {
    echo '<div class="messages">Could not connect to the database. Error: ';
    echo $db->connect_errno . ' - ' . $db->connect_error . '</div>';
} else {
    $dbOk = true;
}

function clean_input($value) {
    $value = trim($value ?? "");
    $value = strip_tags($value);
    return $value;
}

$errors = [];
$successMessage = "";

$name    = "";
$email   = "";
$comment = "";
$feature = "";

if ($dbOk && $_SERVER['REQUEST_METHOD'] === 'POST') {

    $name    = clean_input($_POST['name'] ?? "");
    $email   = clean_input($_POST['email'] ?? "");
    $comment = clean_input($_POST['comment'] ?? "");
    $feature = clean_input($_POST['feature'] ?? "");

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
        $commentToSave = $comment;

    if (!empty($feature)) {
        $commentToSave .= "\n\nFeature suggestion: " . $feature;
    }
        $insQuery = "INSERT INTO siteComments (name, email, comment, status)
                     VALUES (?, ?, ?, 'approved')";

        $statement = $db->prepare($insQuery);

        if (!$statement) {
            $errors[] = "Database error: unable to prepare insert.";
        } else {
            $statement->bind_param("sss", $name, $email, $commentToSave);

            if ($statement->execute()) {
                $successMessage = "Thanks! Your comment has been submitted.";
                $name = $email = $comment = "";
            } else {
                $errors[] = "Database error: unable to save your comment.";
            }

            $statement->close();
        }
    }
}

$comments = [];

if ($dbOk) {
    $selQuery = "SELECT name, email, comment, time
                 FROM siteComments
                 WHERE status = 'approved'
                 ORDER BY time DESC";

    $statement = $db->prepare($selQuery);

    if ($statement) {
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
}

$title = "Comments";
?>

<title>Comment Submission Form</title>
<?php include('includes/head.inc.php'); ?>

<h1>Visitor Comments</h1>

<?php include('includes/menubody.inc.php'); ?>

<?php if (!empty($comments)): ?>

    <?php foreach ($comments as $c): ?>
        <div>
            <strong>
                <?php echo htmlspecialchars($c['name'], ENT_QUOTES, 'UTF-8'); ?>
            </strong>

            <span class="comment-email">
        <?php echo htmlspecialchars($c['email'], ENT_QUOTES, 'UTF-8'); ?>
            </span>

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

            <hr>
        </div>
    <?php endforeach; ?>

<?php else: ?>

    <p>No comments yet. Be the first to leave one!</p>

<?php endif; ?>

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

<form method="post" action="commentsubs.php" onsubmit="return validate(this);">
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
        <button type="submit">Submit Comment</button>
    </p>
</form>

<?php include('includes/foot.inc.php'); ?>

