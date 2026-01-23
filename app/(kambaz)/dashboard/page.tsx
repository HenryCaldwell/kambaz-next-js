import Image from "next/image";
import Link from "next/link";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1200" className="wd-dashboard-course-link">
            <Image
              src="/images/info.png"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1200 </h5>
              <p className="wd-dashboard-course-title">First Year Seminar</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1800" className="wd-dashboard-course-link">
            <Image
              src="/images/binary.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1800 </h5>
              <p className="wd-dashboard-course-title">Discrete Structures</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2000" className="wd-dashboard-course-link">
            <Image
              src="/images/kotlin.png"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS2000 </h5>
              <p className="wd-dashboard-course-title">
                Introduction to Program Design and Implementation
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2100" className="wd-dashboard-course-link">
            <Image
              src="/images/java.png"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS2100 </h5>
              <p className="wd-dashboard-course-title">
                Program Design and Implementation 1
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3000" className="wd-dashboard-course-link">
            <Image
              src="/images/sorting.png"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS3000 </h5>
              <p className="wd-dashboard-course-title">Algorithms and Data</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3100" className="wd-dashboard-course-link">
            <Image
              src="/images/OOP.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS3100 </h5>
              <p className="wd-dashboard-course-title">
                Program Design and Implementation 2
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3800" className="wd-dashboard-course-link">
            <Image
              src="/images/automota.png"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS3800 </h5>
              <p className="wd-dashboard-course-title">Theory of Computation</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
