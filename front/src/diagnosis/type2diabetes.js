import React from "react";
import "../assets/css/diabetes2.css";

function Diabetes2() {
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
      <h1>Type 2 Diabetes</h1>

      <button
        className="tablink"
        onClick={(e) => openPage("definition", e, "red")}
      >
        What it is
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
        <p>
          Managing Type 2 Diabetes involves maintaining stable blood sugar
          levels through a balanced diet, regular physical activity, and, if
          necessary, medication. Here’s a comprehensive meal and workout plan to
          help manage the condition:
        </p>
      </div>
      <div id="meal-plan" className="tabcontent">
        <h2>Meal Plan</h2>
        <h3>General Guidelines</h3>
        <ol>
          <li>Carbohydrate Control: Monitor and manage carbohydrate intake.</li>
          <li>
            Low Glycemic Index (GI): Opt for low-GI foods to maintain stable
            blood sugar levels.
          </li>
          <li>
            Balanced Macronutrients: Include a healthy mix of carbohydrates,
            proteins, and fats.
          </li>
          <li>
            Regular Meals and Snacks: Eat at regular intervals to prevent blood
            sugar spikes and dips.
          </li>
        </ol>
        <h3>Sample Daily Meal Plan</h3>
        <ul>
          <li>
            <strong>Breakfast:</strong>
            <ul>
              <li>Oatmeal with a sprinkle of nuts and berries.</li>
              <li>A boiled egg.</li>
            </ul>
          </li>
          <li>
            <strong>Snack:</strong> A small apple with a tablespoon of almond
            butter.
          </li>
          <li>
            <strong>Lunch:</strong>
            <ul>
              <li>
                Grilled chicken breast with a quinoa salad (mixed greens, cherry
                tomatoes, cucumbers, and a light vinaigrette).
              </li>
              <li>Steamed broccoli.</li>
            </ul>
          </li>
          <li>
            <strong>Snack:</strong> A handful of almonds and a piece of cheese.
          </li>
          <li>
            <strong>Dinner:</strong>
            <ul>
              <li>
                Baked salmon with a side of roasted vegetables (bell peppers,
                zucchini, and carrots).
              </li>
              <li>A small serving of brown rice.</li>
            </ul>
          </li>
          <li>
            <strong>Evening Snack:</strong> Greek yogurt with a few slices of
            strawberries.
          </li>
        </ul>
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
        <h2>Workout Plan</h2>
        <h3>General Guidelines</h3>
        <ol>
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
            exercise if needed.
          </li>
        </ol>
        <h3>Sample Weekly Workout Plan</h3>
        <ul>
          <li>
            <strong>Monday:</strong>
            <ul>
              <li>Cardio: 30 minutes of brisk walking or jogging.</li>
              <li>
                Strength Training: Upper body workout (push-ups, dumbbell
                presses, tricep dips).
              </li>
            </ul>
          </li>
          <li>
            <strong>Tuesday:</strong>
            <ul>
              <li>Cardio: 30 minutes of cycling or swimming.</li>
              <li>
                Yoga/Stretching: 20 minutes of yoga focusing on flexibility and
                relaxation.
              </li>
            </ul>
          </li>
          <li>
            <strong>Wednesday:</strong>
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
            <strong>Thursday:</strong> Rest Day: Light activity like walking or
            gentle stretching.
          </li>
          <li>
            <strong>Friday:</strong>
            <ul>
              <li>Cardio: 30 minutes of elliptical or stair climbing.</li>
              <li>
                Strength Training: Full body workout (combination of upper and
                lower body exercises).
              </li>
            </ul>
          </li>
          <li>
            <strong>Saturday:</strong>
            <ul>
              <li>Cardio: 45 minutes of a favorite sport or dance class.</li>
              <li>
                Yoga/Stretching: 20 minutes of deep stretching or restorative
                yoga.
              </li>
            </ul>
          </li>
          <li>
            <strong>Sunday:</strong> Active Recovery: Light activities like a
            leisurely walk, swimming, or gentle yoga.
          </li>
        </ul>
      </div>
      <div id="tips" className="tabcontent">
        {" "}
        <h3>Tips for Success</h3>
        <ol>
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
        </ol>
      </div>
    </div>
  );
}

export default Diabetes2;
