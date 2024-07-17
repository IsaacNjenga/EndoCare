import React from "react";
import "../assets/css/pcos.css";

function Pcos() {
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
    <div className="pcos-container">
      <h1>Polycystic Ovary Syndrome (PCOS)</h1>
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
          Polycystic ovary syndrome (PCOS) is a common hormonal condition that
          affects women of reproductive age. It usually starts during
          adolescence, but symptoms may fluctuate over time. PCOS can cause
          hormonal imbalances, irregular periods, excess androgen levels and
          cysts in the ovaries. Irregular periods, usually with a lack of
          ovulation, can make it difficult to become pregnant. PCOS is a leading
          cause of infertility. PCOS is a chronic condition and cannot be cured.
          However, some symptoms can be improved through lifestyle changes,
          medications and fertility treatments. The cause of PCOS is unknown but
          women with a family history or type 2 diabetes are at higher risk
        </p>
      </div>
      <div id="meal-plan" className="tabcontent">
        <section className="pcos-section">
          <h2>PCOS Meal Plan</h2>
          <h3>General Guidelines</h3>
          <ul>
            <li>
              Balance Macronutrients: Ensure a balance of carbohydrates,
              proteins, and fats.
            </li>
            <li>
              Low Glycemic Index (GI): Opt for low-GI foods to stabilize blood
              sugar levels.
            </li>
            <li>
              High Fiber: Include plenty of fiber-rich foods to aid digestion
              and improve insulin sensitivity.
            </li>
            <li>
              Anti-Inflammatory Foods: Incorporate foods that reduce
              inflammation.
            </li>
          </ul>
        </section>
        <section className="pcos-section">
          <h3>Sample Daily Meal Plan</h3>
          <div>
            <h4>Breakfast</h4>
            <ul>
              <li>
                Greek yogurt with mixed berries and a sprinkle of chia seeds.
              </li>
              <li>Whole grain toast with avocado and a boiled egg.</li>
            </ul>
          </div>
          <div>
            <h4>Snack</h4>
            <ul>
              <li>A handful of almonds or walnuts.</li>
              <li>An apple.</li>
            </ul>
          </div>
          <div>
            <h4>Lunch</h4>
            <ul>
              <li>
                Quinoa salad with mixed greens, chickpeas, cherry tomatoes,
                cucumbers, and a lemon-tahini dressing.
              </li>
              <li>Grilled chicken breast.</li>
            </ul>
          </div>
          <div>
            <h4>Snack</h4>
            <ul>
              <li>Carrot and celery stick with hummus.</li>
              <li>
                A small smoothie made with spinach, banana, and almond milk.
              </li>
            </ul>
          </div>
          <div>
            <h4>Dinner</h4>
            <ul>
              <li>
                Baked salmon with a side of steamed broccoli and sweet potato.
              </li>
              <li>Mixed green salad with olive oil and balsamic vinegar.</li>
            </ul>
          </div>
          <div>
            <h4>Evening Snack</h4>
            <ul>
              <li>Cottage cheese with sliced strawberries.</li>
              <li>Herbal tea.</li>
            </ul>
          </div>
        </section>
        <section className="pcos-section">
          <h3>Foods to Include</h3>
          <ul>
            <li>Proteins: Lean meats, fish, eggs, beans, and legumes.</li>
            <li>
              Carbohydrates: Whole grains, vegetables, fruits, and legumes.
            </li>
            <li>Fats: Avocados, nuts, seeds, and olive oil.</li>
            <li>Fiber: Vegetables, fruits, whole grains, and legumes.</li>
            <li>
              Anti-inflammatory Foods: Berries, fatty fish, leafy greens, and
              olive oil.
            </li>
          </ul>
        </section>
        <section className="pcos-section">
          <h3>Foods to Avoid</h3>
          <ul>
            <li>Sugary Foods: Sodas, candies, pastries.</li>
            <li>Refined Carbohydrates: White bread, pasta, and pastries.</li>
            <li>Trans Fats: Found in many processed foods.</li>
            <li>
              High Glycemic Index Foods: White bread, white rice, and potatoes.
            </li>
          </ul>
        </section>
      </div>
      <div id="workout-plan" className="tabcontent">
        <h2>Workout Plan</h2>
        <ul>
          <li>
            Consistency: Aim for at least 150 minutes (about 2 and a half hours)
            of moderate exercise per week.
          </li>
          <li>
            Mix of Cardio and Strength Training: Both are important for managing
            PCOS symptoms.
          </li>
          <li>
            Flexibility and Stress Reduction: Include yoga or stretching to
            improve flexibility and reduce stress.
          </li>
        </ul>{" "}
        <h3>Sample Weekly Workout Plan</h3>
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
        <h3>Tips for Success</h3>
        <ul>
          <li>Stay Hydrated: Drink plenty of water throughout the day.</li>
          <li>Sleep Well: Aim for 7-8 hours of quality sleep each night.</li>
          <li>
            Monitor Progress: Keep a journal of your meals, workouts, and how
            you feel.
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

export default Pcos;
