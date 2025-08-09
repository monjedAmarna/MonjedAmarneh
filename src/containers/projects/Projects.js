import React, { useContext } from "react";
import "./Project.scss";
import ProjectCard from "../../components/projectCard/ProjectCard";
import StyleContext from "../../contexts/StyleContext";

export default function Projects() {
  const { isDark } = useContext(StyleContext);

  const chronicareCardInfo = {
    projectName: "Chronicare – Patient Health Tracker",
    desc: "A smart platform to track and monitor patients' health metrics, medications, and care plans in one place.",
    date: "May 2025 – July 2025",
    projectLogo: require("../../assets/images/cards/chronicare/img1.jpg"),
    descBullets: [
      "Built with Node.js, Express, React, and MongoDB",
      "Real-time health tracking and alert system",
      "Multi-role dashboards for patients, doctors, and admins",
      "Medication management and care plan assignment"
    ],
    images: [
      require("../../assets/images/cards/chronicare/img1.jpg"),
      require("../../assets/images/cards/chronicare/img2.jpg"),
      require("../../assets/images/cards/chronicare/img3.jpg"),
      require("../../assets/images/cards/chronicare/img4.jpg")
    ]
  };

  const monjedFinanceCardInfo = {
    projectName: "monjed finance",
    desc: "A simple mock application for personal finance management, designed for everyday individuals. This is a demo project and contains non-real data.",
    date: "December 2024",
    projectLogo: require("../../assets/images/freelance.png"),
    descBullets: [
      "Personal finance management application",
      "Simple and intuitive user interface",
      "Demo project with mock data",
      "Built for everyday users"
    ],
    footerLink: [
      {
        name: "View",
        url: "https://monjedamarna.github.io/monjed-finance/#/"
      }
    ]
  };

  return (
    <div className="main project-section" id="projects">
      <h1 className="project-section-heading">Projects</h1>
      <div className="project-cards-div">
        <ProjectCard cardInfo={chronicareCardInfo} isDark={isDark} />
        <ProjectCard cardInfo={monjedFinanceCardInfo} isDark={isDark} />
      </div>
    </div>
  );
}
