"use client";
import React, { useState } from "react";
import InfoCards from "./InfoCards";

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  return (
    <div>
      <InfoCards
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </div>
  );
};

export default Dashboard;
