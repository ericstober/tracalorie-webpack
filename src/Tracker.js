import Storage from './Storage';

class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories(0);
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._displayCalorieLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();

    document.getElementById('limit').value = this._calorieLimit;
  }

  // Public Methods
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    Storage.updateTotalCalories(this._totalCalories);
    Storage.saveMeal(meal);
    this._displayNewMeal(meal);
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.updateTotalCalories(this._totalCalories);
    Storage.saveWorkout(workout);
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);

    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      Storage.updateTotalCalories(this._totalCalories);
      Storage.removeMeal(id);
      this._meals.splice(index, 1);
      this._render();
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);

    if (index !== -1) {
      const workout = this._workouts[index];
      this._totalCalories += workout.calories;
      Storage.updateTotalCalories(this._totalCalories);
      Storage.removeWorkout(id);
      this._workouts.splice(index, 1);
      this._render();
    }
  }

  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    Storage.clearAll();
    this._render();
  }

  setLimit(calorieLimit) {
    this._calorieLimit = calorieLimit;
    Storage.setCalorieLimit(calorieLimit);
    this._displayCalorieLimit();
    this._render();
  }

  loadItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  // Private Methods
  _displayCaloriesTotal() {
    const totalCaloriesElement = document.getElementById('calories-total');
    totalCaloriesElement.innerHTML = this._totalCalories;
  }

  _displayCalorieLimit() {
    const calorieLimitElement = document.getElementById('calories-limit');
    calorieLimitElement.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedElement = document.getElementById('calories-consumed');

    const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);

    caloriesConsumedElement.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedElement = document.getElementById('calories-burned');

    const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);

    caloriesBurnedElement.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingElement = document.getElementById('calories-remaining');
    const progressElement = document.getElementById('calorie-progress');

    const remaining = this._calorieLimit - this._totalCalories;

    caloriesRemainingElement.innerHTML = remaining;

    if (remaining <= 0) {
      caloriesRemainingElement.parentElement.parentElement.classList.remove('bg-light');
      caloriesRemainingElement.parentElement.parentElement.classList.add('bg-danger');
      progressElement.classList.remove('bg-success');
      progressElement.classList.add('bg-danger');
    } else {
      caloriesRemainingElement.parentElement.parentElement.classList.remove('bg-danger');
      caloriesRemainingElement.parentElement.parentElement.classList.add('bg-light');
      progressElement.classList.remove('bg-danger');
      progressElement.classList.add('bg-success');
    }
  }

  _displayCaloriesProgress() {
    const progressElement = document.getElementById('calorie-progress');

    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressElement.style.width = `${width}%`;
  }

  _displayNewMeal(meal) {
    const mealsElement = document.getElementById('meal-items');
    const mealElement = document.createElement('div');
    mealElement.classList.add('card', 'my-2');
    mealElement.setAttribute('data-id', meal.id);
    mealElement.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">${meal.calories}</div>
          <button class="delete btn btn-danger btn-sm mx-2"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
    `

    mealsElement.appendChild(mealElement);
  }

  _displayNewWorkout(workout) {
    const workoutsElement = document.getElementById('workout-items');
    const workoutElement = document.createElement('div');
    workoutElement.classList.add('card', 'my-2');
    workoutElement.setAttribute('data-id', workout.id);
    workoutElement.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">${workout.calories}</div>
          <button class="delete btn btn-danger btn-sm mx-2"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
    `

    workoutsElement.appendChild(workoutElement);
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

export default CalorieTracker;
