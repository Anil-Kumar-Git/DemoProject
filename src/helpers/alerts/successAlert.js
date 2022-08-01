<div>
  //success alerts
  <div className="alert alert-success alert-dismissible fade show" role="alert">
    A simple success alert—check it out!
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    />
  </div>
  // model
  <button
    type="button"
    className="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#smallModal"
  >
    Small Modal
  </button>
  <div
    className="modal fade show"
    id="smallModal"
    tabIndex={-1}
    style={{ display: "block" }}
    aria-modal="true"
    role="dialog"
  >
    <div className="modal-dialog modal-sm">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Small Modal</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          Non omnis incidunt qui sed occaecati magni asperiores est mollitia.
          Soluta at et reprehenderit. Placeat autem numquam et fuga numquam.
          Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet
          incidunt est facilis. Dolorem neque recusandae quo sit molestias sint
          dignissimos.
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
  ////
  <div className="col-lg-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Custom Styled Validation</h5>
        <p>
          For custom Bootstrap form validation messages, you’ll need to add the{" "}
          <code>novalidate</code> boolean attribute to your{" "}
          <code>&lt;form&gt;</code>. This disables the browser default feedback
          tooltips, but still provides access to the form validation APIs in
          JavaScript.{" "}
        </p>
        {/* Custom Styled Validation */}
        <form className="row g-3 needs-validation was-validated" noValidate="">
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              defaultValue="John"
              required=""
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom02" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom02"
              defaultValue="Doe"
              required=""
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustomUsername" className="form-label">
              Username
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required=""
              />
              <div className="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustom03" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom03"
              required=""
            />
            <div className="invalid-feedback">Please provide a valid city.</div>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationCustom04" className="form-label">
              State
            </label>
            <select className="form-select" id="validationCustom04" required="">
              <option selected="" disabled="" value="">
                Choose...
              </option>
              <option>...</option>
            </select>
            <div className="invalid-feedback">Please select a valid state.</div>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationCustom05" className="form-label">
              Zip
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom05"
              required=""
            />
            <div className="invalid-feedback">Please provide a valid zip.</div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="invalidCheck"
                required=""
              />
              <label className="form-check-label" htmlFor="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Submit form
            </button>
          </div>
        </form>
        {/* End Custom Styled Validation */}
      </div>
    </div>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Custom Styled Validation with Tooltips</h5>
        <p>
          If your form layout allows it, you can swap the{" "}
          <code>
            .{"{"}valid|invalid{"}"}-feedback
          </code>{" "}
          classes for .
          <code>
            {"{"}valid|invalid{"}"}-tooltip
          </code>{" "}
          classes to display validation feedback in a styled tooltip. Be sure to
          have a parent with <code>position: relative</code> on it for tooltip
          positioning. In the example below, our column classes have this
          already, but your project may require an alternative setup.{" "}
        </p>
        {/* Custom Styled Validation with Tooltips */}
        <form className="row g-3 needs-validation was-validated" noValidate="">
          <div className="col-md-4 position-relative">
            <label htmlFor="validationTooltip01" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationTooltip01"
              defaultValue="John"
              required=""
            />
            <div className="valid-tooltip">Looks good!</div>
          </div>
          <div className="col-md-4 position-relative">
            <label htmlFor="validationTooltip02" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationTooltip02"
              defaultValue="Doe"
              required=""
            />
            <div className="valid-tooltip">Looks good!</div>
          </div>
          <div className="col-md-4 position-relative">
            <label htmlFor="validationTooltipUsername" className="form-label">
              Username
            </label>
            <div className="input-group has-validation">
              <span
                className="input-group-text"
                id="validationTooltipUsernamePrepend"
              >
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="validationTooltipUsername"
                aria-describedby="validationTooltipUsernamePrepend"
                required=""
              />
              <div className="invalid-tooltip">
                Please choose a unique and valid username.
              </div>
            </div>
          </div>
          <div className="col-md-6 position-relative">
            <label htmlFor="validationTooltip03" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="validationTooltip03"
              required=""
            />
            <div className="invalid-tooltip">Please provide a valid city.</div>
          </div>
          <div className="col-md-3 position-relative">
            <label htmlFor="validationTooltip04" className="form-label">
              State
            </label>
            <select
              className="form-select"
              id="validationTooltip04"
              required=""
            >
              <option selected="" disabled="" value="">
                Choose...
              </option>
              <option>...</option>
            </select>
            <div className="invalid-tooltip">Please select a valid state.</div>
          </div>
          <div className="col-md-3 position-relative">
            <label htmlFor="validationTooltip05" className="form-label">
              Zip
            </label>
            <input
              type="text"
              className="form-control"
              id="validationTooltip05"
              required=""
            />
            <div className="invalid-tooltip">Please provide a valid zip.</div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Submit form
            </button>
          </div>
        </form>
        {/* End Custom Styled Validation with Tooltips */}
      </div>
    </div>
  </div>

  ////
  
</div>;
