import { Routes, Route } from "react-router-dom";
import Home from "@/(pages)/Home";
import About from "@/(pages)/about";
import Contact from "@/(pages)/contact";
import NotFound from "@/(pages)/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
