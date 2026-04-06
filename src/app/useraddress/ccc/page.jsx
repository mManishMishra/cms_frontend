"use client";
import React, { useState } from "react";
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
      <div className="row container">
        <div className="col-lg-2">
          <div className="bedroom shadow p-2 w-75 rounded-3">
            <div className="d-flex align-items-center justify-content-between mb-2 ">
              <button onClick={handleAddBedroom} className="border-0 plusminus">
                <CiCirclePlus />
              </button>
              <h4 className="fs-2 mb-0 pt-1">{bedrooms}</h4>
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
          <div className="bathroom shadow p-2 w-75 rounded-3">
            <div className="d-flex align-items-center justify-content-between mb-2 ">
              <button
                onClick={handleAddBathroom}
                className="border-0 plusminus"
              >
                <CiCirclePlus />
              </button>
              <h4 className="fs-2 mb-0 pt-1">{bathrooms}</h4>
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
          <div className="living shadow p-2 w-75 rounded-3">
            <div className="d-flex align-items-center justify-content-between mb-2 ">
              <button onClick={handleAddLiving} className="border-0 plusminus">
                <CiCirclePlus />
              </button>
              <h4 className="fs-2 mb-0 pt-1">{living}</h4>
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
          <div className="kitchen shadow p-2 w-75 rounded-3">
            <div className="d-flex align-items-center justify-content-between mb-2 ">
              <button onClick={handleAddKitchen} className="border-0 plusminus">
                <CiCirclePlus />
              </button>
              <h4 className="fs-2 mb-0 pt-1">{kitchen}</h4>
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
  );
};

export default Page;
