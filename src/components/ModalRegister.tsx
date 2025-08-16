import { useState } from "react";
export default function ModalRegister() {
  const [fname, setFname] = useState("");
  const [fnameError, setFnameError] = useState(false);
  const [lname, setLname] = useState("");
  const [buyBottle, setBuyBottle] = useState(false);
  const [buyShoes, setBuyShoes] = useState(false);
  const [buyCap, setBuyCap] = useState(false);
  // add more state variables:
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState("");
  const [lnameError, setLnameError] = useState(false);
  const [planError, setPlanError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [agree, setAgree] = useState(false);
  // ----------------------------------------------------------------
  const inputFnameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFnameError(false);
    setFname(event.target.value);
  };

  const inputLnameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (lnameError) setLnameError(false);
    setLname(event.target.value);
  };

  const selectPlanOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (planError) setPlanError(false);
    setPlan(event.target.value);
  };

  const radioGenderMaleOnChange = () => {
    setGender("male");
    if (genderError) setGenderError(false);
  };

  const radioGenderFemaleOnChange = () => {
    setGender("female");
    if (genderError) setGenderError(false);
  };

  const cbBuyBottleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyBottle(event.target.checked);
  };

  const cbBuyShoesOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyShoes(event.target.checked);
  };

  const cbBuyCapOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyCap(event.target.checked);
  };

  // ----------------------------------------------------------------

  const computeTotalPayment = () => {
    let total = 0;
    if (plan === "funrun") total += 500;
    if (plan === "mini") total += 800;
    if (plan === "half") total += 1200;
    if (plan === "full") total += 1500; 

    let extras = 0;
    if (buyBottle) extras += 200;
    if (buyShoes) extras += 600;
    if (buyCap) extras += 400;

    const isDiscounted = buyBottle && buyShoes && buyCap;
    if (isDiscounted) {extras = Math.round(extras * 0.8);}

    return total+extras;
  };

  // ----------------------------------------------------------------

  const registerBtnOnClick = () => { 
    let ok = true;
    
    if (fname.trim() === "") {
      setFnameError(true);
      ok = false;
    }

    if (lname.trim() === "") {
      setLnameError(true);
      ok = false;
    }
     if (plan === "") {
      setPlanError(true);
      ok = false;
     }
     if (gender === "") {
      setGenderError(true);
      ok = false;
     }
     if (!ok) return;
     if (ok) {
      alert(`Registration complete. Please pay money for ${computeTotalPayment().toLocaleString()} THB.`
    );
    }
  };

  return (
    <div
      className="modal fade"
      id="modalregister" //id="modalregister": ตัวระบุของ modal (ใช้กับ data-bs-target หน้า HomePage)
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* First name & Last name */}
            <div className="d-flex gap-2">
              <div>
                <label className="form-label">First name</label>
                <input
                  className={"form-control" + (fnameError ? " is-invalid" : "")}
                  onChange={inputFnameOnChange}
                  value={fname}
                />
                
                {fnameError && ( <div className="invalid-feedback">Invalid first name</div>  )}

              </div>
              <div>
                <label className="form-label">Last name</label>
                <input
                  className={"form-control" + (lnameError ? " is-invalid" : "")}
                  onChange={inputLnameOnChange}
                  value={lname}
                />        
                 {lnameError && (
                <div className="invalid-feedback">Invalid last name</div>
                  )}
              </div>
            </div>

            {/* Running Plan */}
            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select
                className={"form-select" + (planError ? " is-invalid" : "")}
                onChange={selectPlanOnChange}
                value={plan}
              >
                <option value="">Please select..</option>
                <option value="funrun">Fun run 5.5 Km (500 THB)</option>
                <option value="mini">Mini Marathon 10 Km (800 THB)</option>
                <option value="half">Half Marathon 21 Km (1,200 THB)</option>
                <option value="full">
                  Full Marathon 42.195 Km (1,500 THB)
                </option>
              </select>
              {planError && (
               <div className="invalid-feedback">Please select a Plan</div>
              )}
            </div>

            {/* Gender */}
            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="radio"
                  onChange={radioGenderMaleOnChange}
                  checked={gender === "male"}
                />
                Male 👨
                <input
                  className="mx-2 form-check-input"
                  type="radio"
                  onChange={radioGenderFemaleOnChange}
                  checked={gender === "female"}
                />
                Female 👩
                {/* To show error when user did not select gender, */}
                {/* We just have to render the div below (Not using is-invalid bootstrap class) */}
                {/* <div className="text-danger">Please select gender</div> */}
                {genderError && (
                                  <div className="text-danger mt-1">Please select gender</div>
                                 )}
              </div>
            </div>

            {/* Extra Items */}
            <div className="mt-2">
              <label className="form-label">Extra Item(s)</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbBuyBottleOnChange}
                  checked={buyBottle}
                />
                <label className="form-check-label">Bottle 🍼 (200 THB)</label>
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbBuyShoesOnChange}
                  checked={buyShoes}
                />
                <label className="form-check-label">Shoes 👟 (600 THB)</label>
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbBuyCapOnChange}
                  checked={buyCap}
                />
                <label className="form-check-label">Cap 🧢 (400 THB)</label>
              </div>
            </div>

            <div className="alert alert-primary mt-3" role="alert">
              Promotion📢 Buy all items to get 20% Discount
            </div>

            {/* Total Payment */}
            <div>
              Total Payment : {computeTotalPayment().toLocaleString()} THB
              {/* Render below element conditionally when user get 20% discount */}
              {/* <span className="text-success d-block">(20% Discounted)</span> */}
               {(buyBottle && buyShoes && buyCap) && (<span className="text-success d-block">(20% Discounted)</span>)}
            </div>
          </div>
          <div className="modal-footer">
            {/* Terms and conditions */}
            <div className="form-check my-2">
             <input
               id="agree"
               className="form-check-input me-2"
               type="checkbox"
               checked={agree}                       
               onChange={(e) => setAgree(e.target.checked)}  
                />
                <label className="form-check-label" htmlFor="agree">
                I agree to the terms and conditions
                </label>
             </div>
            {/* Register Button */}
            <button
              className="btn btn-success my-2"
              onClick={registerBtnOnClick}
              disabled={!agree}
              //You can embbed a state like below to disabled the button
              //disabled={isUserAgreed}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
