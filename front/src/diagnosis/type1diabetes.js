import React from "react";
import "../assets/css/diabetes1.css";

function Diabetes1() {
  const openPage = (pageName, event, color) => {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }

    document.getElementById(pageName).style.display = "block";
    event.currentTarget.style.backgroundColor = color;
  };

  return (
    <div className="diabetes-container">
      <button
        className="tablink"
        onClick={(e) => openPage("definition", e, "red")}
      >
       Overview
      </button>
      <button
        className="tablink"
        onClick={(e) => openPage("meal-plan", e, "green")}
      >
        Meal plan
      </button>
      <button
        className="tablink"
        onClick={(e) => openPage("workout-plan", e, "blue")}
      >
        Workout plan
      </button>
      <button
        className="tablink"
        onClick={(e) => openPage("tips", e, "orange")}
      >
        Tips for success
      </button>

      <div id="definition" className="tabcontent">
        {" "}
        <h2>Managing Type 1 Diabetes</h2>
        <p>
          Managing Type 1 Diabetes involves careful monitoring of blood sugar
          levels, a balanced diet, and regular physical activity. Here’s a
          comprehensive meal and workout plan to help manage the condition:
        </p>
      </div>

      <div id="meal-plan" className="tabcontent">
        {" "}
        <h3>Meal Plan</h3>
        <h4>General Guidelines</h4>
        <ul>
          <li>
            Carbohydrate Counting: Track carbohydrate intake to balance insulin
            doses.
          </li>
          <li>
            Low Glycemic Index (GI): Opt for low-GI foods to maintain stable
            blood sugar levels.
          </li>
          <li>
            Balanced Macronutrients: Include a mix of carbohydrates, proteins,
            and fats.
          </li>
          <li>
            Regular Meals and Snacks: Eat at regular intervals to prevent blood
            sugar spikes and dips.
          </li>
        </ul>
        <h4>Sample Daily Meal Plan</h4>
        <div>
          <h4>Breakfast</h4>
          <ul>
            <li>Scrambled eggs with spinach and tomatoes.</li>
            <li>Whole grain toast with a small amount of butter or avocado.</li>
          </ul>
        </div>
        <div>
          <h4>Snack</h4>
          <ul>
            <li>A small apple with a tablespoon of peanut butter.</li>
          </ul>
        </div>
        <div>
          <h4>Lunch</h4>
          <ul>
            <li>
              Grilled chicken salad with mixed greens, cucumbers, bell peppers,
              cherry tomatoes, and a light vinaigrette.
            </li>
            <li>A small whole grain roll.</li>
          </ul>
        </div>
        <div>
          <h4>Snack</h4>
          <ul>
            <li>A handful of nuts and a piece of cheese.</li>
          </ul>
        </div>
        <div>
          <h4>Dinner</h4>
          <ul>
            <li>Baked salmon with a side of quinoa and steamed broccoli.</li>
            <li>A small side salad with olive oil and lemon juice.</li>
          </ul>
        </div>
        <div>
          <h4>Evening Snack</h4>
          <ul>
            <li>Greek yogurt with a few slices of strawberries.</li>
          </ul>
        </div>
        <h3>Foods to Include</h3>
        <ul>
          <li>Proteins: Lean meats, fish, eggs, beans, and legumes.</li>
          <li>Carbohydrates: Whole grains, vegetables, fruits, and legumes.</li>
          <li>Fats: Avocados, nuts, seeds, and olive oil.</li>
          <li>Fiber: Vegetables, fruits, whole grains, and legumes.</li>
          <li>
            Low-GI Foods: Most vegetables, legumes, and some fruits like apples
            and berries.
          </li>
        </ul>
        <h3>Foods to Avoid</h3>
        <ul>
          <li>
            Sugary Foods: Sodas, candies, pastries, and other high-sugar foods.
          </li>
          <li>Refined Carbohydrates: White bread, white rice, and pastries.</li>
          <li>Trans Fats: Found in many processed foods.</li>
          <li>High GI Foods: White bread, white rice, and potatoes.</li>
        </ul>
      </div>
      <div id="workout-plan" className="tabcontent">
        {" "}
        <h3>Workout Plan</h3>
        <h4>General Guidelines</h4>
        <ul>
          <li>
            Consistency: Aim for at least 150 minutes (about 2 and a half hours)
            of moderate exercise per week.
          </li>
          <li>
            Mix of Cardio and Strength Training: Both are important for managing
            diabetes and overall health.
          </li>
          <li>
            Monitor Blood Sugar Levels: Check levels before, during, and after
            exercise.
          </li>
        </ul>
        <h4>Sample Weekly Workout Plan</h4>
        <ul>
          <li>
            Monday:
            <ul>
              <li>Cardio: 30 minutes of brisk walking or jogging.</li>
              <li>
                Strength Training: Upper body workout (push-ups, dumbbell
                presses, tricep dips).
              </li>
            </ul>
          </li>
          <li>
            Tuesday:
            <ul>
              <li>Cardio: 30 minutes of cycling or swimming.</li>
              <li>
                Yoga/Stretching: 20 minutes of yoga focusing on flexibility and
                relaxation.
              </li>
            </ul>
          </li>
          <li>
            Wednesday:
            <ul>
              <li>
                Cardio: 30 minutes of high-intensity interval training (HIIT).
              </li>
              <li>
                Strength Training: Lower body workout (squats, lunges, leg
                presses).
              </li>
            </ul>
          </li>
          <li>
            Thursday:
            <ul>
              <li>
                Rest Day: Light activity like walking or gentle stretching.
              </li>
            </ul>
          </li>
          <li>
            Friday:
            <ul>
              <li>Cardio: 30 minutes of elliptical or stair climbing.</li>
              <li>
                Strength Training: Full body workout (combination of upper and
                lower body exercises).
              </li>
            </ul>
          </li>
          <li>
            Saturday:
            <ul>
              <li>Cardio: 45 minutes of a favorite sport or dance class.</li>
              <li>
                Yoga/Stretching: 20 minutes of deep stretching or restorative
                yoga.
              </li>
            </ul>
          </li>
          <li>
            Sunday:
            <ul>
              <li>
                Active Recovery: Light activities like a leisurely walk,
                swimming, or gentle yoga.
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div id="tips" className="tabcontent">
        {" "}
        <h4>Tips for Success</h4>
        <ul>
          <li>Stay Hydrated: Drink plenty of water throughout the day.</li>
          <li>Sleep Well: Aim for 7-8 hours of quality sleep each night.</li>
          <li>
            Monitor Blood Sugar Levels: Keep track of your levels regularly,
            especially when trying new foods or exercises.
          </li>
          <li>
            Keep Emergency Snacks: Have fast-acting carbs like glucose tablets
            or juice handy for hypoglycemic episodes.
          </li>
          <li>
            Stay Positive: Focus on small, achievable goals and celebrate your
            progress.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Diabetes1;
