import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_COURSES, QUERY_RESOURCES } from "../utils/queries";
import learning from "../assets/learning.png";

const CoursePage = () => {
  const { courseName } = useParams();

  const {
    loading: coursesLoading,
    error: coursesError,
    data: coursesData,
  } = useQuery(QUERY_COURSES);
  const {
    loading: resourcesLoading,
    error: resourcesError,
    data: resourcesData,
  } = useQuery(QUERY_RESOURCES);

  const [selectedModule, setSelectedModule] = useState(null);
  const [isModuleSelected, setIsModuleSelected] = useState(false);

  useEffect(() => {
    if (coursesData) {
      const course = coursesData.getCourses.find(
        (course) => course.name.toLowerCase() === courseName.toLowerCase()
      );
      setSelectedModule(null);
      setIsModuleSelected(false);
    }
  }, []);

  if (coursesLoading || resourcesLoading) {
    return <div>Loading...</div>;
  }

  if (coursesError || resourcesError) {
    return <div>Error occurred while fetching data</div>;
  }

  const course = coursesData.getCourses.find(
    (course) => course.name.toLowerCase() === courseName.toLowerCase()
  );

  const selectedModuleResources = [];
  for (const resource of resourcesData.getResources) {
    // console.log(resource.name)

    if (resource.name === selectedModule) {
      selectedModuleResources.push(resource);
    }
  }

  if (!course) {
    return <div>Course Not Found</div>;
  }

  return (
    <>
      <div className="flex h-full flex-col sm:flex-row">
        <div className="flex top-18 left-0.25 h-full py-5 w-full sm:w-80 rounded bg-sky-800 bg-opacity-80 from-sky-400 to-indigo-900 text-white shadow-lg z-40 shrink-0 mb-[-25px]">
          <div className="mr-1 flex flex-col items-center w-full">
            <div className="w-full sm:w-5/6 sm:h-20 items-center justify-center text-[22px] font-bold flex">
              <h1 className="text-black">MODULES</h1>
            </div>
            {course.modules.map((module) => (
              <div
                className="hover:cursor-pointer justify-center sm:justify-left shadow-lg bg-cyan-200 bg-opacity-75 ml-3 rounded-xl w-full sm:w-72 h-8 sm:h-24 mt-1 sm:mt-4 flex items-center "
                key={module}
                onClick={() => {
                  setSelectedModule(module);
                  setIsModuleSelected(true);
                }}
              >
                <h3 className="flex indent-2 text-black whitespace-normal font-bold items-center justify-center hover:opacity-75 hover:cursor-pointer ">
                  <p>{module}</p>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div>
          {!isModuleSelected && (
            <>
              <h1 className="text-2xl sm:text-6xl font-bold text-center text-cyan-800 my-6">
                {course.name}
              </h1>
              <div className="flex flex-row mx-5">
                <div className="flex-auto">
                  <div>
                    <p className="font-bold flex text-l sm:text-2xl">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex-auto">
                    <br></br>
                    <p className="font-bold flex text-2xl">
                      Click on the modules to explore more!
                    </p>
                  </div>
                  <div>
                    <img src={learning} alt="learning" />
                  </div>
                </div>
              </div>
            </>
          )}
          {selectedModule &&
            selectedModuleResources.map((resource) => (
              <div key={resource.name} className="flex flex-col">
                <div>
                  <h2 className="text-2xl sm:text-6xl font-bold text-center text-cyan-800 my-6">
                    {resource.name}
                  </h2>
                  <div className="flex flex-col mx-5">
                    <p className="font-bold flex text-l sm:text-2xl">
                      {resource.description}
                    </p>
                    {resource.video && (
                      <div>
                        <div className="rounded-xl flex-col space-y-4 .">
                          <iframe
                            className="rounded-xl mt-5"
                            src={resource.video}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    )}
                    {resource.link && (
                      <div>
                        <p className="font-bold flex text-2xl my-2">
                          Click on the button below to be taken to more
                          resources!
                        </p>

                        <div>
                          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 hover:cursor-pointer">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-100 rounded-md group-hover:bg-opacity-0 hover:cursor-pointer">
                              <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black font-bold hover:cursor-pointer"
                              >
                                Click Here
                              </a>
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CoursePage;
