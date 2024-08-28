<?php

	$dbhost = '127.0.0.1';
	$dbname = 'swiss';
	$dbuser = 'root';
	$dbpass = '';

	$error_reporting(E_ALL);
	$db = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
	ini_set('display_errors', 1);
	if ($db->affected_rows === 0) {
		$db->query('SET NAMES "utf8";');
		$db->query('SET CHARACTER SET "utf8";');
		$db->query('SET SESSION collation_connection = "utf8_general_ci";');
	}

	if (isset($_POST['request'])) {
		$output = 'ok';
		$action = $_POST['action'];

		function getRecords($db, $language, $limit = 'all', $type = 'array') {
			$records = 'ok';
			if ($limit !== 'all') {
				if ($type == 'array') {
					$query = $db->query('SELECT * FROM records WHERE language="'.$language.'" AND LIMIT '.$limit);
				} else {
					$query = $db->query('SELECT * FROM records WHERE language="'.$language.'" AND requested="no" LIMIT '.$limit);
				}
			} else {
				if ($type == 'array') {
					$query = $db->query('SELECT * FROM records WHERE language="'.$language.'"');
				} else {
					$query = $db->query('SELECT * FROM records WHERE language="'.$language.'" AND requested="no"');
				}
			}
			if ($query) {
				if ($query->num_rows > 0) {
					$records = array();
					$ids = array();
					while ($row = $query->fetch_assoc()) {
						switch ($type) {
						 	case 'array':
								$records[$row['login'].$row['language']] = $row;
					 		break;
						 	case 'assoc':
								$records[] = $row;
								$ids[] = $row['id'];
					 		break;
					 	}
					}
					if ($type == 'assoc') {
						$db->query('UPDATE records SET requested="yes" WHERE id IN ('.implode(',', $ids).')');
					}
				}
			}
			return $records;
		}

		switch ($action) {
			case 'get_records':
				$output = getRecords($db, $_POST['language'], $_POST['limit'], 'assoc');
			break;
			case 'put_records':
				$logins = explode("\n", trim($_POST['logins']));
				$language = $_POST['language'];
				$records = getRecords($db, $_POST['language']);
				$doubles = 0;
				$added = count($logins);
				foreach ($logins as $login) {
					if (isset($records[$login.$language])) {
						$doubles++;
						$added--;
					} else {
						$query = $db->query('INSERT INTO records SET login="'.$login.'", language="'.$language.'", requested="no"');
					}
				}
				$output = [
					'added' => $added,
					'language' => $language,
					'doubles' => $doubles
				];
			break;
			case 'get_stats':
				$stats = 'ok';

				$query = $db->query('SELECT COUNT(id) as cnt FROM records WHERE language="PT" AND requested="yes"');
				if ($query) {
					if ($query->num_rows > 0) {
						if ($stats == 'ok') $stats = array();
						$row = $query->fetch_assoc();
						$stats['pt_req_yes'] = $row['cnt'];
					}
				}

				$query = $db->query('SELECT COUNT(id) as cnt FROM records WHERE language="PT" AND requested="no"');
				if ($query) {
					if ($query->num_rows > 0) {
						if ($stats == 'ok') $stats = array();
						$row = $query->fetch_assoc();
						$stats['pt_req_no'] = $row['cnt'];
					}
				}

				$query = $db->query('SELECT COUNT(id) as cnt FROM records WHERE language="FR" AND requested="yes"');
				if ($query) {
					if ($query->num_rows > 0) {
						if ($stats == 'ok') $stats = array();
						$row = $query->fetch_assoc();
						$stats['fr_req_yes'] = $row['cnt'];
					}
				}

				$query = $db->query('SELECT COUNT(id) as cnt FROM records WHERE language="FR" AND requested="no"');
				if ($query) {
					if ($query->num_rows > 0) {
						if ($stats == 'ok') $stats = array();
						$row = $query->fetch_assoc();
						$stats['fr_req_no'] = $row['cnt'];
					}
				}

				$query = $db->query('SELECT COUNT(id) as cnt FROM records WHERE language="ES" AND requested="yes"');
				if ($query) {
					if ($query->num_rows > 0) {
						if ($stats == 'ok') $stats = array();
						$row = $query->fetch_assoc();
						$stats['es_req_yes'] = $row['cnt'];
					}
				}

				$query = $db->query('SELECT COUNT(id) as cnt FROM records WHERE language="ES" AND requested="no"');
				if ($query) {
					if ($query->num_rows > 0) {
						if ($stats == 'ok') $stats = array();
						$row = $query->fetch_assoc();
						$stats['es_req_no'] = $row['cnt'];
					}
				}

				$query = $db->query('SELECT COUNT(id) as cnt FROM records WHERE language="EN" AND requested="yes"');
				if ($query) {
					if ($query->num_rows > 0) {
						if ($stats == 'ok') $stats = array();
						$row = $query->fetch_assoc();
						$stats['en_req_yes'] = $row['cnt'];
					}
				}

				$query = $db->query('SELECT COUNT(id) as cnt FROM records WHERE language="EN" AND requested="no"');
				if ($query) {
					if ($query->num_rows > 0) {
						if ($stats == 'ok') $stats = array();
						$row = $query->fetch_assoc();
						$stats['en_req_no'] = $row['cnt'];
					}
				}

				$query = $db->query('SELECT COUNT(id) as cnt FROM records WHERE requested="yes"');
				if ($query) {
					if ($query->num_rows > 0) {
						if ($stats == 'ok') $stats = array();
						$row = $query->fetch_assoc();
						$stats['total_yes'] = $row['cnt'];
					}
				}

				$query = $db->query('SELECT COUNT(id) as cnt FROM records WHERE requested="no"');
				if ($query) {
					if ($query->num_rows > 0) {
						if ($stats == 'ok') $stats = array();
						$row = $query->fetch_assoc();
						$stats['total_no'] = $row['cnt'];
					}
				}

				$output = $stats;
			break;
		}

		echo json_encode($output);
		die();
	}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Instagram</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>

	<div class="container">
		<div class="row">
			<div class="col-lg-12 mt-5">
				<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
					<input type="radio" class="btn-check btnradio" data-tab="1" name="btnradio" id="btnradio1" autocomplete="off" checked>
					<label class="btn btn-outline-primary" for="btnradio1">Получить</label>

					<input type="radio" class="btn-check btnradio" data-tab="2" name="btnradio" id="btnradio2" autocomplete="off">
					<label class="btn btn-outline-primary" for="btnradio2">Добавить</label>

					<input type="radio" class="btn-check btnradio" data-tab="3" name="btnradio" id="btnradio3" autocomplete="off">
					<label class="btn btn-outline-primary" for="btnradio3">Статистика</label>
				</div>
			</div>
			<div class="col-lg-12 mt-5 tab" id="tab1">
				<div class="get-records-tab-1">
					<h2 class="mb-4">Получить записи</h2>
					<form action="" method="post" class="get-records">
						<div class="d-flex w-50 gap-4">
							<div class="flex-grow-1">
								<select class="form-select" name="language" required>
									<option value="">Язык</option>
									<option value="PT">PT</option>
									<option value="FR">FR</option>
									<option value="ES">ES</option>
									<option value="EN">EN</option>
								</select>
							</div>
							<div class="flex-grow-1">
								<input type="number" name="limit" class="form-control" min="1" placeholder="Количество" required>
							</div>
							<div>
								<button type="submit" class="btn btn-primary px-4">Получить</button>
							</div>
						</div>
					</form>
				</div>
				<div class="get-records-tab-2 d-none">
					<h2 class="mb-4">Получено записей - <span class="records">0</span>, язык <span class="language"></span></h2>
					<div class="w-50 my-4">
						<textarea class="form-control logins" rows="7" readonly></textarea>
					</div>
					<div class="w-50 d-flex justify-content-end">
						<button class="btn btn-primary px-5">OK</button>
					</div>
				</div>
			</div>
			<div class="col-lg-12 mt-5 tab d-none" id="tab2">
				<div class="put-records-tab-1">
					<form action="" method="post" class="put-records">
						<div class="w-50">
							<textarea class="form-control" name="logins" rows="7" required></textarea>
						</div>
						<div class="d-flex w-50 gap-4 mt-3 justify-content-end">
							<div class="w-25">
								<select class="form-select" name="language" required>
									<option value="">Язык</option>
									<option value="PT">PT</option>
									<option value="FR">FR</option>
									<option value="ES">ES</option>
									<option value="EN">EN</option>
								</select>
							</div>
							<div>
								<button type="submit" class="btn btn-primary px-4">Добавить</button>
							</div>
						</div>
					</form>
				</div>
				<div class="put-records-tab-2 d-none">
					<h2 class="mb-2">Добавлено уникальных записей <span class="records">0</span>. Язык <span class="language"></span></h2>
					<h2 class="mb-4">Дубли - <span class="doubles">0</span></h2>
					<div class="w-50 d-flex justify-content-end">
						<button class="btn btn-primary px-5">OK</button>
					</div>
				</div>
			</div>
			<div class="col-lg-12 mt-5 tab d-none" id="tab3">
				<table class="table table-bordered w-50">
					<thead>
						<tr>
							<th class="bg-light fw-normal">Язык</th>
							<th class="bg-light fw-normal">Отправлено</th>
							<th class="bg-light fw-normal">Не отправлено</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>PT</td>
							<td class="pt_req_yes">0</td>
							<td class="pt_req_no">0</td>
						</tr>
						<tr>
							<td>FR</td>
							<td class="fr_req_yes">0</td>
							<td class="fr_req_no">0</td>
						</tr>
						<tr>
							<td>ES</td>
							<td class="es_req_yes">0</td>
							<td class="es_req_no">0</td>
						</tr>
						<tr>
							<td>EN</td>
							<td class="en_req_yes">0</td>
							<td class="en_req_no">0</td>
						</tr>
						<tr>
							<td class="fw-bold">Итого</td>
							<td class="fw-bold total_yes">0</td>
							<td class="fw-bold total_no">0</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
	<script>
		$(function() {
			function getStats() {
				$.ajax({
					url: 'index.php',
					type: 'post',
					dataType: 'json',
					data: 'request=ajax&action=get_stats',
					success: function(data) {
						$('.pt_req_yes').html(data.pt_req_yes);
						$('.pt_req_no').html(data.pt_req_no);
						$('.fr_req_yes').html(data.fr_req_yes);
						$('.fr_req_no').html(data.fr_req_no);
						$('.es_req_yes').html(data.es_req_yes);
						$('.es_req_no').html(data.es_req_no);
						$('.en_req_yes').html(data.en_req_yes);
						$('.en_req_no').html(data.en_req_no);
						$('.total_yes').html(data.total_yes);
						$('.total_no').html(data.total_no);
					},
					error: function(xhr, thrownError) {
						console.log(xhr.responseText);
						console.log(thrownError);
					}
				});
			}
			getStats();
			$('.btnradio').on('click', function() {
				$('.tab').each(function() {
					$(this).addClass('d-none');
				});
				$('#tab'+$(this).attr('data-tab')).removeClass('d-none');
			});
			$('.get-records').on('submit', function() {
				$.ajax({
					url: 'index.php',
					type: 'post',
					dataType: 'json',
					data: 'request=ajax&action=get_records&language='+$('.get-records [name="language"]').val()+'&limit='+$('.get-records [name="limit"]').val(),
					success: function(data) {
						$('.logins').val('');
						if (data !== 'ok') {
							logins = [];
							$(data).each(function(index, item) {
								logins.push(item['login']);
							});
							$('.logins').val(logins.join('\n'));
							$('.get-records-tab-2 .records').html(logins.length);
							$('.get-records-tab-2 .language').html($('.get-records [name="language"]').val());
							$('.get-records-tab-1').addClass('d-none');
							$('.get-records-tab-2').removeClass('d-none');
							getStats();
						}
					},
					error: function(xhr, thrownError) {
						console.log(xhr.responseText);
						console.log(thrownError);
					}
				});
				return false;
			});
			$('.put-records').on('submit', function() {
				$.ajax({
					url: 'index.php',
					type: 'post',
					dataType: 'json',
					data: 'request=ajax&action=put_records&language='+$('.put-records [name="language"]').val()+'&logins='+$('.put-records [name="logins"]').val(),
					success: function(data) {
						$('.put-records-tab-2 .records').html(data.added);
						$('.put-records-tab-2 .language').html(data.language);
						$('.put-records-tab-2 .doubles').html(data.doubles);
						$('.put-records-tab-1').addClass('d-none');
						$('.put-records-tab-2').removeClass('d-none');
						getStats();
					},
					error: function(xhr, thrownError) {
						console.log(xhr.responseText);
						console.log(thrownError);
					}
				});
				return false;
			});
			$('.get-records-tab-2 button').on('click', function() {
				$('.get-records [name="language"]').val('');
				$('.get-records [name="limit"]').val('');
				$('.get-records-tab-1').removeClass('d-none');
				$('.get-records-tab-2').addClass('d-none');
			});
			$('.put-records-tab-2 button').on('click', function() {
				$('.put-records [name="logins"]').val('');
				$('.put-records [name="language"]').val('');
				$('.put-records-tab-1').removeClass('d-none');
				$('.put-records-tab-2').addClass('d-none');
			});
		});
	</script>

</body>
</html>