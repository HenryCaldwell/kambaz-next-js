"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { editModule, setModules, updateModule } from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const cidString = Array.isArray(cid) ? cid[0] : (cid as string);
    const newModule = { name: moduleName, course: cidString };
    const module = await client.createModuleForCourse(cidString, newModule);
    dispatch(setModules([...modules, module]));
  };

  const onRemoveModule = async (moduleId: string) => {
    const cidString = Array.isArray(cid) ? cid[0] : (cid as string);
    await client.deleteModule(cidString, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    const cidString = Array.isArray(cid) ? cid[0] : (cid as string);
    await client.updateModule(cidString, module);
    const newModules = modules.map((m: any) =>
      m._id === module._id ? module : m,
    );
    dispatch(setModules(newModules));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={onCreateModuleForCourse}
      />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              {!module.editing && module.name}
              {module.editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
