import React from "react";
import "../assets/css/adrenalFatigue.css";

function AdrenalFatigue() {
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
    <div className="adrenal-container">
      <h1>Adrenal Fatigue</h1>
      <button className="tablink" onClick={(e) => openPage("definition", e, "red")}>
        What it is
      </button>
      <button className="tablink" onClick={(e) => openPage("meal-plan", e, "green")}>
        Meal plan
      </button>
      <button className="tablink" onClick={(e) => openPage("workout-plan", e, "blue")}>
        Workout plan
      </button>
      <button className="tablink" onClick={(e) => openPage("tips", e, "orange")}>
        Tips for success
      </button>

      <div id="definition" className="tabcontent">
        <h3>Adrenal Fatigue</h3>
        <p>
          Adrenal fatigue is a term used to describe a group of symptoms related
          to chronic stress and adrenal gland dysfunction. While not officially
          recognized as a medical condition, the symptoms can be managed with
          lifestyle changes, including a balanced diet and regular exercise.
          Here’s a comprehensive meal and workout plan to support adrenal
          health.
        </p>
      </div>

      <div id="meal-plan" className="tabcontent">
        <h2>Meal Plan</h2>
        <h3>General Guidelines</h3>
        <ol>
          <li>
            Balanced Macronutrients: Include a mix of carbohydrates, proteins,
            and fats in each meal.
          </li>
          <li>
            Frequent, Small Meals: Eat small, balanced meals every 3-4 hours to
            maintain steady blood sugar levels.
          </li>
          <li>
            Anti-Inflammatory Foods: Incorporate foods that reduce inflammation.
          </li>
          <li>
            Nutrient-Dense Foods: Focus on whole, unprocessed foods rich in
            vitamins and minerals.
          </li>
        </ol>
        <h3>Sample Daily Meal Plan</h3>
        <ul>
          <li>
            <strong>Breakfast:</strong>
            <ul>
              <li>
                Smoothie with spinach, avocado, banana, almond milk, and a scoop
                of protein powder.
              </li>
              <li>Whole grain toast with a thin spread of almond butter.</li>
            </ul>
          </li>
          <li>
            <strong>Snack:</strong>
            <ul>
              <li>
                A small handful of mixed nuts (almonds, walnuts, cashews).
              </li>
              <li>A piece of fruit (e.g., an apple or pear).</li>
            </ul>
          </li>
          <li>
            <strong>Lunch:</strong>
            <ul>
              <li>
                Grilled chicken breast with a quinoa salad (mixed greens, cherry
                tomatoes, cucumbers, and a light vinaigrette).
              </li>
              <li>Steamed asparagus.</li>
            </ul>
          </li>
          <li>
            <strong>Snack:</strong>
            <ul>
              <li>
                Greek yogurt with a sprinkle of chia seeds and a few slices of
                strawberries.
              </li>
            </ul>
          </li>
          <li>
            <strong>Dinner:</strong>
            <ul>
              <li>
                Baked salmon with a side of roasted vegetables (broccoli, bell
                peppers, and carrots).
              </li>
              <li>A small serving of brown rice.</li>
            </ul>
          </li>
          <li>
            <strong>Evening Snack:</strong>
            <ul>
              <li>
                Herbal tea with a small serving of cottage cheese and a few
                berries.
              </li>
            </ul>
          </li>
        </ul>
        <h3>Foods to Include</h3>
        <ul>
          <li>Proteins: Lean meats, fish, eggs, beans, and legumes.</li>
          <li>Carbohydrates: Whole grains, vegetables, fruits, and legumes.</li>
          <li>Fats: Avocados, nuts, seeds, and olive oil.</li>
          <li>Fiber: Vegetables, fruits, whole grains, and legumes.</li>
          <li>
            Anti-Inflammatory Foods: Berries, fatty fish, leafy greens, and
            olive oil.
          </li>
          <li>
            Adaptogenic Herbs: Ashwagandha, Rhodiola, and Holy Basil (consult
            with a healthcare provider before use).
          </li>
        </ul>
        <h3>Foods to Avoid</h3>
        <ul>
          <li>
            Sugary Foods: Sodas, candies, pastries, and other high-sugar foods.
          </li>
          <li>Refined Carbohydrates: White bread, white rice, and pastries.</li>
          <li>
            Caffeine and Alcohol: Limit intake as they can exacerbate adrenal
            fatigue.
          </li>
          <li>Processed Foods: Foods high in unhealthy fats and additives.</li>
        </ul>
      </div>
      <div id="workout-plan" className="tabcontent">
        <h2>Workout Plan</h2>
        <h3>General Guidelines</h3>
        <ol>
          <li>
            Moderate Exercise: Focus on moderate, consistent exercise rather
            than intense workouts.
          </li>
          <li>Stress Reduction: Include activities that help reduce stress.</li>
          <li>
            Listen to Your Body: Avoid overexertion and prioritize rest when
            needed.
          </li>
        </ol>
        <h3>Sample Weekly Workout Plan</h3>
        <ul>
          <li>
            <strong>Monday:</strong>
            <ul>
              <li>Cardio: 30 minutes of brisk walking.</li>
              <li>
                Yoga/Stretching: 20 minutes of gentle yoga focusing on
                relaxation.
              </li>
            </ul>
          </li>
          <li>
            <strong>Tuesday:</strong>
            <ul>
              <li>
                Strength Training: Light upper body workout (resistance bands,
                light weights, bodyweight exercises).
              </li>
              <li>Cardio: 20 minutes of swimming or cycling.</li>
            </ul>
          </li>
          <li>
            <strong>Wednesday:</strong> Rest Day: Focus on light activities like
            a leisurely walk or gentle stretching.
          </li>
          <li>
            <strong>Thursday:</strong>
            <ul>
              <li>
                Cardio: 30 minutes of low-intensity aerobic exercise (e.g.,
                walking, tai chi).
              </li>
              <li>
                Strength Training: Light lower body workout (squats, lunges,
                bodyweight exercises).
              </li>
            </ul>
          </li>
          <li>
            <strong>Friday:</strong>
            <ul>
              <li>Yoga/Stretching: 30 minutes of restorative yoga.</li>
              <li>
                Light Cardio: 20 minutes of cycling or elliptical machine.
              </li>
            </ul>
          </li>
          <li>
            <strong>Saturday:</strong> Active Recovery: Engage in a favorite
            low-impact activity, such as a nature walk or light dance class.
          </li>
          <li>
            <strong>Sunday:</strong> Rest Day: Focus on relaxation and light
            stretching or meditation.
          </li>
        </ul>
      </div>
      <div id="tips" className="tabcontent">
        <h3>Tips for Success</h3>
        <ol>
          <li>Stay Hydrated: Drink plenty of water throughout the day.</li>
          <li>
            Prioritize Sleep: Aim for 7-9 hours of quality sleep each night.
          </li>
          <li>
            Manage Stress: Incorporate stress-reducing activities like
            meditation, deep breathing exercises, or hobbies you enjoy.
          </li>
          <li>
            Monitor Symptoms: Keep track of your energy levels, mood, and
            overall well-being to adjust your plan as needed.
          </li>
          <li>
            Seek Support: Consider working with a healthcare professional,
            nutritionist, or personal trainer to tailor the plan to your
            individual needs.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default AdrenalFatigue;
