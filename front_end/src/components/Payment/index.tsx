import './index'; // Import your CSS file

const PaymentForm = () => {
  return (
    <div className="container">
      <h1>Confirm Your Payment</h1>
      <div className="first-row">
        <div className="owner">
          <h3>Owner</h3>
          <div className="input-field">
            <input type="text" />
          </div>
        </div>
        <div className="cvv">
          <h3>CVV</h3>
          <div className="input-field">
            <input type="password" />
          </div>
        </div>
      </div>
      <div className="second-row">
        <div className="card-number">
          <h3>Card Number</h3>
          <div className="input-field">
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="third-row">
        <h3>Card Number</h3>
        <div className="selection">
          <div className="date">
            <select name="months" id="months">
              {/* Options for months */}
            </select>
            <select name="years" id="years">
              {/* Options for years */}
            </select>
          </div>
          <div className="cards">
            <img src="mc.png" alt="" />
            <img src="vi.png" alt="" />
            <img src="pp.png" alt="" />
          </div>
        </div>
      </div>
      <a href="">Confirm</a>
    </div>
  );
};

export default PaymentForm;