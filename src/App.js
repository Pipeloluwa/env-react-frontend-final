import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./pages/login_screen";
import SuperAdminManagement from "./pages/1_super_admin/super_admin_management";
import TaggerModelsManagement from "./pages/2_tagger/tagger_models_management";
import SuperUsersManagement from "./pages/1_super_admin/super_users_management";
import SuperUsersAdd from "./pages/1_super_admin/super_users_add";
import SuperModelsManagement from "./pages/1_super_admin/super_models_management";
import SuperModelsAdd from "./pages/1_super_admin/super_models_add";
import AddObjectsModel from "./pages/add_objects_model";
import ViewObjectsModel from "./pages/view_objects_model";
import TaggerManagement from "./pages/2_tagger/tagger_management";
import TaggerModelsAdd from "./pages/2_tagger/tagger_models_add";
import ReviewerModels from "./pages/3_reviewer/reviewer_models";
import NOT_FOUND_404 from "./pages/404_NOT_FOUND";

function App() {
  return (
    <div>
      {/* <BrowserRouter basename="/home"> */}
      <BrowserRouter>
        <Routes>
          <Route path="*" element= {<NOT_FOUND_404 />} />

          <Route index  element={<LoginScreen/>}/>

          {/* +++++++++++++++++ SUPER ADMIN ROUTES ++++++ */}
          <Route path="admin-super-management" element= {<SuperAdminManagement />} />

          <Route path="admin-model-management" element= {<SuperModelsManagement />} />
          <Route path="admin-model-add" element= {<SuperModelsAdd />} />

          <Route path="admin-user-management" element= {<SuperUsersManagement />} />
          <Route path="admin-user-add" element= {<SuperUsersAdd />} />

          <Route path="add-objects-model/:dynamicParam" element= {<AddObjectsModel />} />
          <Route path="view-objects-model/:dynamicParam" element= {<ViewObjectsModel />} />


          {/* +++++++++++ TAGGER A ROUTES +++++++++++ */}
          <Route  path="tagger-model-management" element={<TaggerModelsManagement />}/>
          <Route  path="tagger-management" element={<TaggerManagement />}/>
          <Route path="tagger-model-add" element= {<TaggerModelsAdd />} />


          {/* ++++++++++++++ REVIEWER MODEL VIEW ++++++++++ */}
          <Route path="reviewer-model" element= {<ReviewerModels />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
