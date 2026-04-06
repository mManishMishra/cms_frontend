"use client";
import MainLayout from "../layouts/MainLayout";
import { useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
const Page = () => {

  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [living, setLiving] = useState(0);
  const [kitchen, setKitchen] = useState(0);

  const handleAddBedroom = () => setBedrooms(bedrooms + 1);
  const handleRemoveBedroom = () =>
    setBedrooms(bedrooms > 0 ? bedrooms - 1 : 0);
  const handleAddBathroom = () => setBathrooms(bathrooms + 1);
  const handleRemoveBathroom = () =>
    setBathrooms(bathrooms > 0 ? bathrooms - 1 : 0);

  const handleAddLiving = () => setLiving(living + 1);
  const handleRemoveLiving = () => setLiving(living > 0 ? living - 1 : 0);

  const handleAddKitchen = () => setKitchen(kitchen + 1);
  const handleRemoveKitchen = () => setKitchen(kitchen > 0 ? kitchen - 1 : 0);
  return (
    <div>
      <MainLayout>
        <main>
          <section className="container my-5">
            <div className="row">
              <h3 className="pb-4 text-center">
                Choose Your <span className="font_stylish">Home</span>
              </h3>
              <div className="col-lg-4">
                <div className="card card_check_bhk">
                  <div>
                    <input
                      className="form-check-input big_check"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel"
                      value=""
                      aria-label="..."
                    />
                  </div>
                  <img
                    src="/images/che.png"
                    className="w-100 object-fit-contain"
                    height={180}
                    alt=""
                  />
                  <h5 className="text-center">Apartments</h5>
                  <div className="m-auto my-3 text-center">
                    <div className="form-check form-check-inline ">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="option1"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        1 BHK
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="option2"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio2">
                        2 BHK
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="option1"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        3 BHK
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="option2"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio2">
                        4 BHK
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card card_check_bhk">
                  <div>
                    <input
                      className="form-check-input big_check"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel"
                      value=""
                      aria-label="..."
                    />
                  </div>
                  <img
                    src="/images/che.png"
                    className="w-100 object-fit-contain"
                    height={180}
                    alt=""
                  />
                  <h5 className="text-center">Villa</h5>
                  <div className="m-auto my-3 text-center">
                    <div className="form-check form-check-inline ">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="option1"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        1 BHK
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="option2"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio2">
                        2 BHK
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="option1"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        3 BHK
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="option2"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio2">
                        4 BHK
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card card_check_bhk">
                  <div>
                    <input
                      className="form-check-input big_check"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel"
                      value=""
                      aria-label="..."
                    />
                  </div>
                  <img
                    src="/images/che.png"
                    className="w-100 object-fit-contain"
                    height={180}
                    alt=""
                  />
                  <h5 className="text-center">Flat</h5>
                  <div className="m-auto my-3 text-center">
                    <div className="form-check form-check-inline ">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="option1"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        1 BHK
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="option2"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio2">
                        2 BHK
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="option1"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        3 BHK
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="option2"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio2">
                        4 BHK
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <section className="container">
            <div className="row justify-content-ceter">
              <div className="col-lg-2">
                <div className="counter_card">
                  <button
                    onClick={()=>{
                     if ( setKitchen(kitchen -1)){


                  <display message="" className="px-3 mt-2 form-control-lg">
                    {counter}
                  </display>
                  <button
                    onClick={incrementCounter}
                    className="border-0 plusminus"
                  >
                    <CiCirclePlus />
                  </button>

                </div>
                <h5 className="my-3 text-center">
                  Living
                  </h5>
              </div>
              <div className="col-lg-2">
                <div className="counter_card">

                  <display message="" className="px-3 mt-2 form-control-lg">
                    {counter}
                  </display>
                  <button
                    onClick={incrementCounter}
                    className="border-0 plusminus"
                  >
                    <CiCirclePlus />
                  </button>

                </div>
                <h5 className="my-3 text-center">
                  Living
                  </h5>
              </div>
              <div className="col-lg-2">
                <div className="counter_card">

                  <display message="" className="px-3 mt-2 form-control-lg">
                    {counter}
                  </display>
                  <button
                    onClick={incrementCounter}
                    className="border-0 plusminus"
                  >
                    <CiCirclePlus />
                  </button>

                </div>
                <h5 className="my-3 text-center">
                  Living
                  </h5>
              </div>
              <div className="col-lg-2">
                <div className="counter_card">

                  <display message="" className="px-3 mt-2 form-control-lg">
                    {counter}
                  </display>
                  <button
                    onClick={incrementCounter}
                    className="border-0 plusminus"
                  >
                    <CiCirclePlus />
                  </button>

                </div>
                <h5 className="my-3 text-center">
                  Living
                  </h5>
              </div>
            </div>
          </section> */}

<div className="my-4 counter">
  <div className="container">
  <div className="row">
        <div className="col-lg-2">
          <div className="p-2 shadow bedroom w-75 rounded-3">
            <div className="mb-2 d-flex align-items-center justify-content-between ">
              <button onClick={handleAddBedroom} className="border-0 plusminus">
                <CiCirclePlus />
              </button>
              <h4 className="pt-1 mb-0 fs-2">{bedrooms}</h4>
              <button
                onClick={handleRemoveBedroom}
                className="border-0 plusminus"
              >
                <CiCircleMinus />
              </button>
            </div>
          </div>
          <h4>Bedroom</h4>
        </div>
        <div className="col-lg-2">
          <div className="p-2 shadow bathroom w-75 rounded-3">
            <div className="mb-2 d-flex align-items-center justify-content-between ">
              <button
                onClick={handleAddBathroom}
                className="border-0 plusminus"
              >
                <CiCirclePlus />
              </button>
              <h4 className="pt-1 mb-0 fs-2">{bathrooms}</h4>
              <button
                onClick={handleRemoveBathroom}
                className="border-0 plusminus"
              >
                <CiCircleMinus />
              </button>
            </div>
          </div>
          <h4>Bathroom</h4>
        </div>

        <div className="col-lg-2">
          <div className="p-2 shadow living w-75 rounded-3">
            <div className="mb-2 d-flex align-items-center justify-content-between ">
              <button onClick={handleAddLiving} className="border-0 plusminus">
                <CiCirclePlus />
              </button>
              <h4 className="pt-1 mb-0 fs-2">{living}</h4>
              <button
                onClick={handleRemoveLiving}
                className="border-0 plusminus"
              >
                <CiCircleMinus />
              </button>
            </div>
          </div>
          <h4>Living</h4>
        </div>

        <div className="col-lg-2">
          <div className="p-2 shadow kitchen w-75 rounded-3">
            <div className="mb-2 d-flex align-items-center justify-content-between ">
              <button onClick={handleAddKitchen} className="border-0 plusminus">
                <CiCirclePlus />
              </button>
              <h4 className="pt-1 mb-0 fs-2">{kitchen}</h4>
              <button
                onClick={handleRemoveKitchen}
                className="border-0 plusminus"
              >
                <CiCircleMinus />
              </button>
            </div>
          </div>
          <h4>Kitchen</h4>
        </div>
      </div>
  </div>
</div>


        </main>
      </MainLayout>
    </div>
  );
};

export default Page;
