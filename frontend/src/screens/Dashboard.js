import React from "react";

const Dashboard = () => {
  return (
    <div>
      <nav className="navbar navbar-dark sticky-top flex-md-nowrap p-0">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://">
          Company name
        </a>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="http://">
              Sign out
            </a>
          </li>
        </ul>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="http://">
                    <i className="zmdi zmdi-widgets"></i>
                    Dashboard <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://">
                    <i className="zmdi zmdi-file-text"></i>
                    Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://">
                    <i className="zmdi zmdi-shopping-cart"></i>
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://">
                    <i className="zmdi zmdi-accounts"></i>
                    Customers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://">
                    <i className="zmdi zmdi-chart"></i>
                    Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://">
                    <i className="zmdi zmdi-layers"></i>
                    Integrations
                  </a>
                </li>
              </ul>

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center pl-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <a
                  className="d-flex align-items-center text-muted"
                  href="http://"
                >
                  <i className="zmdi zmdi-plus-circle-o"></i>
                </a>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <a className="nav-link" href="http://">
                    <i className="zmdi zmdi-file-text"></i>
                    Current month
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://">
                    <i className="zmdi zmdi-file-text"></i>
                    Last quarter
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://">
                    <i className="zmdi zmdi-file-text"></i>
                    Social engagement
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://">
                    <i className="zmdi zmdi-file-text"></i>
                    Year-end sale
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 my-3">
            <div className="card-list">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                  <div className="card blue">
                    <div className="title">all projects</div>
                    <i className="zmdi zmdi-upload"></i>
                    <div className="value">89</div>
                    <div className="stat">
                      <b>13</b>% increase
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                  <div className="card green">
                    <div className="title">team members</div>
                    <i className="zmdi zmdi-upload"></i>
                    <div className="value">5,990</div>
                    <div className="stat">
                      <b>4</b>% increase
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                  <div className="card orange">
                    <div className="title">total budget</div>
                    <i className="zmdi zmdi-download"></i>
                    <div className="value">$80,990</div>
                    <div className="stat">
                      <b>13</b>% decrease
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                  <div className="card red">
                    <div className="title">new customers</div>
                    <i className="zmdi zmdi-download"></i>
                    <div className="value">3</div>
                    <div className="stat">
                      <b>13</b>% decrease
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="projects mb-4">
              <div className="projects-inner">
                <header className="projects-header">
                  <div className="title">Ongoing Projects</div>
                  <div className="count">| 32 Projects</div>
                  <i className="zmdi zmdi-download"></i>
                </header>
                <table className="projects-table">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Deadline</th>
                      <th>Leader + Team</th>
                      <th>Budget</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <p>New Dashboard</p>
                        <p>Google</p>
                      </td>
                      <td>
                        <p>17th Oct, 15</p>
                        <p className="text-danger">Overdue</p>
                      </td>
                      <td className="member">
                        <figure>
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png"
                            alt=""
                          />
                        </figure>
                        <div className="member-info">
                          <p>Myrtle Erickson</p>
                          <p>UK Design Team</p>
                        </div>
                      </td>
                      <td>
                        <p>$4,670</p>
                        <p>Paid</p>
                      </td>
                      <td className="status">
                        <span className="status-text status-orange">
                          In progress
                        </span>
                      </td>
                      <td>
                        <form className="form" action="#" method="POST">
                          <select className="action-box">
                            <option>Actions</option>
                            <option>Start project</option>
                            <option>Send for QA</option>
                            <option>Send invoice</option>
                          </select>
                        </form>
                      </td>
                    </tr>
                    <tr className="danger-item">
                      <td>
                        <p>New Dashboard</p>
                        <p>Google</p>
                      </td>
                      <td>
                        <p>17th Oct, 15</p>
                        <p className="text-danger">Overdue</p>
                      </td>
                      <td className="member">
                        <figure>
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png"
                            alt=""
                          />
                        </figure>
                        <div className="member-info">
                          <p>Myrtle Erickson</p>
                          <p>UK Design Team</p>
                        </div>
                      </td>
                      <td>
                        <p>$4,670</p>
                        <p>Paid</p>
                      </td>
                      <td className="status">
                        <span className="status-text status-red">Blocked</span>
                      </td>
                      <td>
                        <form className="form" action="#" method="POST">
                          <select className="action-box">
                            <option>Actions</option>
                            <option>Start project</option>
                            <option>Send for QA</option>
                            <option>Send invoice</option>
                          </select>
                        </form>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>New Dashboard</p>
                        <p>Google</p>
                      </td>
                      <td>
                        <p>17th Oct, 15</p>
                        <p className="text-danger">Overdue</p>
                      </td>
                      <td className="member">
                        <figure>
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png"
                            alt=""
                          />
                        </figure>
                        <div className="member-info">
                          <p>Myrtle Erickson</p>
                          <p>UK Design Team</p>
                        </div>
                      </td>
                      <td>
                        <p>$4,670</p>
                        <p>Paid</p>
                      </td>
                      <td className="status">
                        <span className="status-text status-orange">
                          In progress
                        </span>
                      </td>
                      <td>
                        <form className="form" action="#" method="POST">
                          <select className="action-box">
                            <option>Actions</option>
                            <option>Start project</option>
                            <option>Send for QA</option>
                            <option>Send invoice</option>
                          </select>
                        </form>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>New Dashboard</p>
                        <p>Google</p>
                      </td>
                      <td>
                        <p>17th Oct, 15</p>
                        <p className="text-danger">Overdue</p>
                      </td>
                      <td className="member">
                        <figure>
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png"
                            alt=""
                          />
                        </figure>
                        <div className="member-info">
                          <p>Myrtle Erickson</p>
                          <p>UK Design Team</p>
                        </div>
                      </td>
                      <td>
                        <p>$4,670</p>
                        <p>Paid</p>
                      </td>
                      <td className="status">
                        <span className="status-text status-blue">
                          Early stages
                        </span>
                      </td>
                      <td>
                        <form className="form" action="#" method="POST">
                          <select className="action-box">
                            <option>Actions</option>
                            <option>Start project</option>
                            <option>Send for QA</option>
                            <option>Send invoice</option>
                          </select>
                        </form>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>New Dashboard</p>
                        <p>Google</p>
                      </td>
                      <td>
                        <p>17th Oct, 15</p>
                        <p className="text-danger">Overdue</p>
                      </td>
                      <td className="member">
                        <figure>
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png"
                            alt=""
                          />
                        </figure>
                        <div className="member-info">
                          <p>Myrtle Erickson</p>
                          <p>UK Design Team</p>
                        </div>
                      </td>
                      <td>
                        <p>$4,670</p>
                        <p>Paid</p>
                      </td>
                      <td className="status">
                        <span className="status-text status-orange">
                          In progress
                        </span>
                      </td>
                      <td>
                        <form className="form" action="#" method="POST">
                          <select className="action-box">
                            <option>Actions</option>
                            <option>Start project</option>
                            <option>Send for QA</option>
                            <option>Send invoice</option>
                          </select>
                        </form>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="chart-data">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="chart radar-chart dark">
                    <div className="actions">
                      <button
                        type="button"
                        className="btn btn-link"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="zmdi zmdi-more-vert"></i>
                      </button>
                      <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" type="button">
                          Action
                        </button>
                        <button className="dropdown-item" type="button">
                          Another action
                        </button>
                        <button className="dropdown-item" type="button">
                          Something else here
                        </button>
                      </div>
                    </div>
                    <h3 className="title">Household Expenditure</h3>
                    <p className="tagline">Yearly</p>
                    <canvas height="400" id="radarChartDark"></canvas>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="chart bar-chart light">
                    <div className="actions">
                      <button
                        type="button"
                        className="btn btn-link"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="zmdi zmdi-more-vert"></i>
                      </button>
                      <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" type="button">
                          Action
                        </button>
                        <button className="dropdown-item" type="button">
                          Another action
                        </button>
                        <button className="dropdown-item" type="button">
                          Something else here
                        </button>
                      </div>
                    </div>
                    <h3 className="title">Monthly revenue</h3>
                    <p className="tagline">2015 (in thousands US$)</p>
                    <canvas height="400" id="barChartHDark"></canvas>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="chart doughnut-chart dark">
                    <div className="actions">
                      <button
                        type="button"
                        className="btn btn-link"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="zmdi zmdi-more-vert"></i>
                      </button>
                      <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" type="button">
                          Action
                        </button>
                        <button className="dropdown-item" type="button">
                          Another action
                        </button>
                        <button className="dropdown-item" type="button">
                          Something else here
                        </button>
                      </div>
                    </div>
                    <h3 className="title">Exports of Goods</h3>
                    <p className="tagline">2015 (in billion US$)</p>
                    <canvas height="400" id="doughnutChartDark"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
