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
      <button
        className="tablink"
        onClick={(e) => openPage("definition", e, "grey")}
      >
        Overview
      </button>
      <button
        className="tablink"
        onClick={(e) => openPage("meal-plan", e, "grey")}
      >
        Meal plan
      </button>
      <button
        className="tablink"
        onClick={(e) => openPage("workout-plan", e, "grey")}
      >
        Workout plan
      </button>
      <button className="tablink" onClick={(e) => openPage("tips", e, "grey")}>
        Tips for success
      </button>

      <div id="definition" className="tabcontent">
        <br />
        <section>
          <h2 className="def-title">Adrenal Fatigue</h2>
          <p className="def-p">
            Adrenal fatigue is a term often used to describe a set of
            nonspecific symptoms, such as body aches, fatigue, nervousness,
            sleep disturbances, and digestive problems. It is believed to occur
            when the adrenal glands function below the necessary level,
            primarily due to chronic stress.
          </p>
          <br />
          <p className="def-p">
            Managing adrenal fatigue involves reducing stress, improving diet,
            and incorporating lifestyle changes. This can include getting
            adequate sleep, engaging in regular physical activity, practicing
            relaxation techniques, and eating a balanced diet rich in whole
            foods.
          </p>
          <br />
          <p className="def-p">
            While adrenal fatigue is not a medically recognized condition,
            addressing stress and promoting overall health can improve
            well-being.
          </p>
        </section>
      </div>

      <div id="meal-plan" className="tabcontent">
        <br />
        <section>
          <h2>Meal Plan</h2>
          <h3>
            <u>General Guidelines</u>
          </h3>
          <ol>
            <li>
              Balanced Macronutrients: Ensure a balance of carbohydrates,
              proteins, and fats in each meal.
            </li>
            <li>
              Frequent, Small Meals: Eat small, balanced meals every 3-4 hours
              to maintain steady blood sugar and electrolyte levels.
            </li>
            <li>
              Adequate Salt Intake: Ensure proper sodium intake to compensate
              for aldosterone deficiency.
            </li>
            <li>
              Nutrient-Dense Foods: Focus on whole, unprocessed foods rich in
              vitamins and minerals.
            </li>
          </ol>

          <h3>Foods to Include</h3>
          <ul>
            <li>Proteins: Lean meats, fish, eggs, beans, and legumes.</li>
            <li>
              Carbohydrates: Whole grains, vegetables, fruits, and legumes.
            </li>
            <li>Fats: Avocados, nuts, seeds, and olive oil.</li>
            <li>Fiber: Vegetables, fruits, whole grains, and legumes.</li>
            <li>
              Sodium-Rich Foods: Incorporate enough sodium, such as through
              lightly salted snacks or meals with sea salt.
            </li>
          </ul>
          <h3>Foods to Avoid</h3>
          <ul>
            <li>
              Sugary Foods: Sodas, candies, pastries, and other high-sugar
              foods.
            </li>
            <li>
              Refined Carbohydrates: White bread, white rice, and pastries.
            </li>
            <li>
              Caffeine and Alcohol: Limit intake as they can exacerbate
              symptoms.
            </li>
            <li>
              Processed Foods: Foods high in unhealthy fats and additives.
            </li>
          </ul>
        </section>
      </div>
      <div id="workout-plan" className="tabcontent">
        <br />
        <h2>Workout Plan</h2>
        <h3>
          <u>General Guidelines</u>
        </h3>
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
        <br />
        <hr />
        <h3>
          <u>Sample Weekly Workout Plan</u>
        </h3>
        <ul>
          <li>
            <strong>Mondays & Thursdays:</strong>
            <ul>
              <li>Cardio: 30 minutes of brisk walking.</li>
              <li>
                Yoga/Stretching: 20 minutes of gentle yoga focusing on
                relaxation.
              </li>
            </ul>
          </li>
          <li>
            <strong>Tuesdays & Fridays:</strong>
            <ul>
              <li>
                Strength Training: Light upper body workout (resistance bands,
                light weights, bodyweight exercises).
              </li>
              <li>Cardio: 20 minutes of swimming or cycling.</li>
            </ul>
          </li>
          <li>
            <strong>Wednesdays, Saturdays & Sundays:</strong> Rest Day: Focus on
            light activities like a leisurely walk or gentle stretching.
          </li>
        </ul>
      </div>
      <div id="tips" className="tabcontent">
        <br />
        <h3>Tips for Success</h3>
        <ol>
          <li>
            <strong>Stay Hydrated:</strong> Drink plenty of water throughout the
            day to maintain optimal hydration. Consider incorporating
            electrolyte drinks, especially if recommended by your healthcare
            provider, to help balance sodium and potassium levels in the body.
          </li>
          <li>
            <strong>Prioritize Sleep:</strong> Aim for 7-9 hours of quality
            sleep each night to support overall health and well-being. Establish
            a consistent sleep routine and create a restful environment by
            minimizing noise, light, and electronic distractions.
          </li>
          <li>
            <strong>Manage Stress:</strong> Incorporate stress-reducing
            activities such as meditation, deep breathing exercises, yoga, or
            hobbies that you enjoy. Chronic stress can exacerbate symptoms of
            adrenal insufficiency, so finding effective ways to relax and unwind
            is crucial.
          </li>
          <li>
            <strong>Monitor Symptoms:</strong> Keep track of your energy levels,
            mood, and overall well-being in a journal or app. This can help you
            identify patterns and make necessary adjustments to your treatment
            plan. Regular monitoring can also provide valuable information for
            your healthcare provider.
          </li>
          <li>
            <strong>Seek Support:</strong> Consider working with a healthcare
            provider or nutritionist specializing in adrenal health. They can
            offer personalized advice and support tailored to your specific
            needs. Joining support groups or communities with others
            experiencing similar health challenges can also provide emotional
            support and practical tips.
          </li>
          <li>
            <strong>Balanced Diet:</strong> Follow a diet rich in nutrient-dense
            foods, including lean proteins, whole grains, healthy fats, and
            plenty of fruits and vegetables. Avoid processed foods, sugary
            snacks, and excessive caffeine, which can negatively impact adrenal
            health.
          </li>
          <li>
            <strong>Educate Yourself:</strong> Stay informed about adrenal
            insufficiency and its management. Understanding your condition can
            empower you to make informed decisions about your health and
            advocate for yourself in medical settings.
          </li>
          <li>
            <strong>Emergency Preparedness:</strong> Be prepared for potential
            adrenal crises by carrying an emergency kit that includes
            corticosteroid injections and other necessary medications. Ensure
            that family members, friends, and coworkers are aware of your
            condition and know how to assist you in an emergency.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default AdrenalFatigue;
