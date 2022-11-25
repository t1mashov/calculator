<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>Тимашов Петр Валерьевич 211-362 Лабораторная работа №9 Вариант №20</title>
  <link rel = "icon" href = "https://cdn-icons-png.flaticon.com/512/43/43146.png" />
</head>

<body>
  <header class="header">
    <div class="header-content container">
      <img class="logo" src="https://profkommospolytech.ru/wp-content/uploads/2022/01/0b6dd8bb96f9fc0544405b04019e34b7.png" alt="logo">
    </div>
  </header>

  <?php
  $type = 'E';// тип верстки
  ?>

  <main class="main">
    <div style="height:100px"></div>
    <div class="main-content container" >
    <?php
      $min = PHP_INT_MAX;
      $max = PHP_INT_MIN;
      $avg;
      $sum = 0;

      $min_value = -20000;
      $max_value = 20000;

      $x = -10;	// начальное значение аргумента
      $encounting = 500;	// количество вычисляемых значений
      $step = 1;	// шаг изменения аргумента

      switch ($type) {
        case 'B':
          echo '<ul>'; break;
        case 'C':
          echo '<ol>'; break;
        case 'D':
          echo '<table><tr><th>Номер строки </th><th>Значение аргумента</th><th>Значение функции</th>';
          break;
      }

      $i = 0;
      $f = 0;
      while ($f < $max_value && $f > $min_value && $i < $encounting) {
        $x += $step;
        $i += 1;

        if ($x != 0) {
          
          if ($x <= 10)	$f = 3/$x + $x/3 - 5;
          else if ($x < 20 && $x > 10) $f = ($x-7) * $x/8;	
          else if ($x >= 20) $f = 3*$x + 2;

        } else {

          switch ($type) {
            case 'A':
              echo '<p class="function">f('.$x.') = error</p>'; break;
            case 'B':
              echo '<li class="function">f('.$x.') = error</li>'; break;
            case 'D':
              echo '<tr><td>'.$i.'</td><td>f('.$x.') = error</td><td>error</td></tr>'; break;
            default:
              echo '<div class="function-div">f('.$x.') = error</div>';
          }

          continue;
        };

        $f = round($f, 3); // округление функции до  3 знаков после запятой
        
        $sum += $f; //сумаа
        $avg = $sum / ($i + 1); //среднее арифметическое(сумму делим на количество шагов)

        if ($f < $min) $min = $f;
        if ($f > $max) $max = $f;   

        switch ($type) {
          case 'A':
            echo '<p class="function">f('.$x.') = '.$f.'</p>'; break;
          case 'B':
            echo '<li class="function">f('. $x.') = '.$f.'</li>'; break;
          case 'C':
            echo '<li class="function">f('. $x.') = '.$f.'</li>'; break;
          case 'D':
            echo '<tr><td>'.$i.'</td><td>'.$x.'</td><td>'.$f.'</td></tr>'; break;
          case 'E':
            echo '<div class="function-div">f('.$x.') = '.$f.'</div>'; break;
        }

      }

      switch ($type) {
        case 'B':
          echo '</ul>'; break;
        case 'C':
          echo '</ol>'; break;
        case 'D':
          echo '</table>'; break;
      }

      echo '
      <div class="res">
        Минимальное: '.$min.'</br>
        Максимальное: '.$max.'</br>
        Сумма: '.round($sum, 3).'</br>
        Среднее арифметическое: '.round($avg, 3).'
      </div>
      ';
    ?>
    
  </main>
  <footer class="footer">
    <div class="footer__content container">
      <p class="footer__type">Тип верстки: 
      <?php

      switch ($type) {
        case 'A':
          echo '"A". Верстка текстом'; break;
        case 'B':
          echo '"B". Маркированный список'; break;
        case 'C':
          echo '"C". Нумерованный список'; break;
        case 'D':
          echo '"D". Табличная верстка'; break;
        case 'E':
          echo '"E". Блочная верстка'; break;
      }
        
      ?>
      </p>
      
    </div>
  </footer>
</body>

</html>