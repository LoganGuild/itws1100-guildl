<?php
  include('includes/init.inc.php');      // DOCTYPE + opening tags
  include('includes/config.inc.php');    // database configuration
  include('includes/functions.inc.php'); // functions
?>
<title>PHP &amp; MySQL - ITWS</title>

<?php
  include('includes/head.inc.php');
  // include global css, javascript, end the head and open the body
?>

<h1>PHP &amp; MySQL</h1>

<?php include('includes/menubody.inc.php'); ?>

<?php
  // We'll need a database connection both for retrieving records and for
  // inserting them.
  $dbOk = false;

  // Create a new database connection using values from config.inc.php
  @ $db = new mysqli(
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

  // Have we posted?
  $havePost = isset($_POST["save"]);

  // Validation
  $errors = '';
  if ($havePost) {

    $title = htmlspecialchars(trim($_POST["title"]));
    $year  = htmlspecialchars(trim($_POST["year"]));

    $focusId = '';

    if ($title == '') {
      $errors .= '<li>Title may not be blank</li>';
      if ($focusId == '') $focusId = '#title';
    }

    // year is optional, but if given must be 4 digits
    if ($year != '' && !preg_match('/^\d{4}$/', $year)) {
      $errors .= '<li>Year must be 4 digits (yyyy) or left blank</li>';
      if ($focusId == '') $focusId = '#year';
    }

    if ($errors != '') {
      echo '<div class="messages"><h4>Please correct the following errors:</h4><ul>';
      echo $errors;
      echo '</ul></div>';
      echo '<script type="text/javascript">';
      echo '  $(document).ready(function() {';
      echo '    $("' . $focusId . '").focus();';
      echo '  });';
      echo '</script>';
    } else {
      if ($dbOk) {
        // Trim for DB (no extra escaping needed because of prepared stmts)
        $titleForDb = trim($_POST["title"]);
        $yearForDb  = trim($_POST["year"]);

        // Setup a prepared statement
        $insQuery = "insert into movies (`title`,`year`) values(?,?)";
        $statement = $db->prepare($insQuery);
        $statement->bind_param("ss", $titleForDb, $yearForDb);
        $statement->execute();

        echo '<div class="messages"><h4>Success: ' . $statement->affected_rows . ' movie added to database.</h4>';
        echo $title . ' (' . ($year == '' ? 'no year' : $year) . ')</div>';

        $statement->close();
      }
    }
  }
?>

<h3>Add Movie</h3>
<form id="addForm" name="addForm" action="movies.php" method="post" onsubmit="return validate(this);">
  <fieldset>
    <div class="formData">

      <label class="field" for="title">Title:</label>
      <div class="value">
        <input type="text" size="60"
               value="<?php if ($havePost && $errors != '') { echo $title; } ?>"
               name="title" id="title" />
      </div>

      <label class="field" for="year">Year:</label>
      <div class="value">
        <input type="text" size="6" maxlength="4"
               value="<?php if ($havePost && $errors != '') { echo $year; } ?>"
               name="year" id="year" /> <em>yyyy (optional)</em>
      </div>

      <input type="submit" value="save" id="save" name="save" />
    </div>
  </fieldset>
</form>

<h3>Movies</h3>
<table id="movieTable">
<?php
  if ($dbOk) {

    $query = 'select * from movies order by title';
    $result = $db->query($query);
    $numRecords = $result->num_rows;

    echo '<tr><th>Title:</th><th>Year:</th><th></th></tr>';
    for ($i = 0; $i < $numRecords; $i++) {
      $record = $result->fetch_assoc();
      if ($i % 2 == 0) {
        echo "\n" . '<tr id="movie-' . $record['movieid'] . '"><td>';
      } else {
        echo "\n" . '<tr class="odd" id="movie-' . $record['movieid'] . '"><td>';
      }
      echo htmlspecialchars($record['title']);
      echo '</td><td>';
      echo htmlspecialchars($record['year']);
      echo '</td><td>';
      echo '<img src="resources/delete.png" class="deleteMovie" width="16" height="16" alt="delete movie"/>';
      echo '</td></tr>';
      // debug lines (keep commented)
      // echo '<tr><td colspan="3" style="white-space: pre;">';
      // print_r($record);
      // echo '</td></tr>';
    }

    $result->free();
    $db->close();
  }
?>
</table>

<?php include('includes/foot.inc.php');
// footer info and closing tags
?>

