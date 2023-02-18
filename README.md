# todo-app-react - branch: task_timer

App working on Vercel:
https://todo-app-react-git-tasktimer-galichandrey.vercel.app/

2023 02 18
Improvements:
* playTaskTime и pauseTaskTimer - перенесены из компонента App в компонент Timer.

2023 02 16
Improvements:
* Таймер не должен запускаться если задача выполнена
* Таймер должен стопаться когда отмечаешь задачу выполненной
* timerId вынесен в компонент Timer.
* Структура файлов. Осуществлена первая попытка сделать структуру файлов приближенную к Feature-Sliced Design (https://feature-sliced.design/)

2023 02 11
Improvements:

* Each task has a timer that we can start and stop.
When you press "Start" button the timer begins to count down the time and is updated every second.
When timer stopped, the countdown stops and it can be resumed by pressing the "Start" button.

* The timer works correctly when changing browser tabs and changing application tabs (All, Active, Completed).

2023 02 10
Improvements:
* Field for adding minutes and second for the countdown timer.

Work in progress:
* Play and pause the countdown timer with the buttons.