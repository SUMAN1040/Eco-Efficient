import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Coins, Gift, ChevronRight, Sparkles } from 'lucide-react';

const giftCards = [
  { id: 1, brand: 'Amazon', type: 'Gift Card', color: 'linear-gradient(135deg, #FF9900, #FFB84D)', text: 'white', amount: 500, coins: 5000 },
  { id: 2, brand: 'Flipkart', type: 'Voucher', color: 'linear-gradient(135deg, #2874F0, #649DF5)', text: 'white', amount: 500, coins: 4800 },
  { id: 3, brand: 'Myntra', type: 'Gift Card', color: 'linear-gradient(135deg, #FF3F6C, #FF7B9C)', text: 'white', amount: 1000, coins: 9500 },
  { id: 4, brand: 'Mamaearth', type: 'Store Credit', color: 'linear-gradient(135deg, #7FA82A, #A6D346)', text: 'white', amount: 250, coins: 2000 },
  { id: 5, brand: 'Swiggy', type: 'Food Voucher', color: 'linear-gradient(135deg, #FC8019, #FD9E4F)', text: 'white', amount: 200, coins: 1800 },
  { id: 6, brand: 'Starbucks', type: 'Coffee Pass', color: 'linear-gradient(135deg, #00704A, #009965)', text: 'white', amount: 300, coins: 2800 },
  { id: 7, brand: 'Zomato', type: 'Food Voucher', color: 'linear-gradient(135deg, #E23744, #F25764)', text: 'white', amount: 100, coins: 900 },
  { id: 8, brand: 'Blinkit', type: 'Grocery Pass', color: 'linear-gradient(135deg, #F8CB46, #FAD66A)', text: '#333', amount: 50, coins: 450 },
  { id: 9, brand: 'Spotify', type: '1-Month Premium', color: 'linear-gradient(135deg, #1DB954, #1ED760)', text: 'white', amount: 119, coins: 1100 },
  { id: 10, brand: 'Nykaa', type: 'Beauty Voucher', color: 'linear-gradient(135deg, #FC2779, #FD5193)', text: 'white', amount: 200, coins: 1900 },
  { id: 11, brand: 'Domino\'s', type: 'Pizza Voucher', color: 'linear-gradient(135deg, #0055A5, #0071CE)', text: 'white', amount: 100, coins: 950 },
  { id: 12, brand: 'BookMyShow', type: 'Movie Ticket', color: 'linear-gradient(135deg, #F84464, #FA6A85)', text: 'white', amount: 150, coins: 1400 },
];

const Redeem = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "EcoEfficient | Redeem Rewards";
  }, []);

  return (
    <div className="min-vh-100 position-relative overflow-x-hidden pb-5" style={{ background: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .glass-header {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(45, 74, 34, 0.05);
        }
        .balance-card {
          background: linear-gradient(135deg, #10b981, #2D4A22);
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.2);
          position: relative;
          overflow: hidden;
        }
        .gift-card-wrap {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.04);
          background: white;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .gift-card-wrap:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-color: rgba(16, 185, 129, 0.2);
        }
        .brand-banner {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .btn-redeem {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          font-weight: 700;
          transition: all 0.3s ease;
        }
        .btn-redeem:hover {
          background: #10b981;
          color: white;
        }
      `}</style>

      {/* Background Decor */}
      <div className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="position-absolute rounded-circle" style={{ width: '600px', height: '600px', background: 'rgba(16, 185, 129, 0.04)', top: '-10%', left: '-10%', filter: 'blur(100px)' }}></div>
        <div className="position-absolute rounded-circle" style={{ width: '800px', height: '800px', background: 'rgba(45, 74, 34, 0.03)', bottom: '-20%', right: '-10%', filter: 'blur(120px)' }}></div>
      </div>

      {/* Header Navigation */}
      <nav className="fixed-top glass-header" style={{ zIndex: 1000 }}>
        <div className="container-fluid px-3 px-md-5 d-flex align-items-center" style={{ minHeight: '80px' }}>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn btn-link text-dark text-decoration-none d-flex align-items-center gap-2 p-0 opacity-75 hover-opacity-100"
          >
            <ArrowLeft size={20} />
            <span className="fw-bold">Back</span>
          </button>
          <div className="mx-auto fw-black text-uppercase tracking-wide" style={{ letterSpacing: '0.1em' }}>
            Rewards Center
          </div>
          <div style={{ width: '60px' }}></div> {/* Spacer for centering */}
        </div>
      </nav>

      <main className="container position-relative z-1" style={{ paddingTop: '120px' }}>
        
        {/* Upper Center: Balance Card */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="balance-card text-white text-center p-5">
              {/* Decorative elements */}
              <div className="position-absolute top-0 end-0 p-4 opacity-25">
                <Sparkles size={100} />
              </div>
              <div className="position-absolute bottom-0 start-0 p-3 opacity-10" style={{ transform: 'rotate(-15deg)' }}>
                <Coins size={120} />
              </div>
              
              <div className="position-relative z-1">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-25 mb-3" style={{ width: '64px', height: '64px' }}>
                  <Coins size={32} color="white" />
                </div>
                <p className="text-uppercase fw-bold mb-1 opacity-75" style={{ letterSpacing: '0.1em', fontSize: '0.9rem' }}>Eco Coin Balance</p>
                <h1 className="display-3 fw-black mb-0 tracking-tighter">2,450</h1>
                <p className="small mt-2 opacity-75">1 Eco Coin = ₹ 10</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Matrix Header */}
        <div className="d-flex align-items-center justify-content-between mb-4 mt-5">
          <h3 className="fw-black mb-0 text-dark">Available Vouchers</h3>
        </div>

        {/* 3-Column Gift Card Grid */}
        <div className="row g-4">
          {giftCards.map((card) => (
            <div key={card.id} className="col-12 col-md-6 col-lg-4">
              <div className="gift-card-wrap">
                <div className="brand-banner" style={{ background: card.color }}>
                  <div className="position-absolute w-100 h-100" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
                  <h2 className="fw-black mb-0 position-relative z-1 tracking-tighter" style={{ color: card.text, fontSize: '2rem' }}>
                    {card.brand}
                  </h2>
                </div>
                
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                      <h5 className="fw-bold text-dark mb-1">₹{card.amount} {card.type}</h5>
                      <p className="small text-muted mb-0">Instant Delivery via Email</p>
                    </div>
                    <div className="bg-success bg-opacity-10 rounded p-2 text-success">
                      <Gift size={20} />
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                        <Coins size={14} color="white" />
                      </div>
                      <span className="fw-bold text-dark fs-5">{card.coins.toLocaleString()}</span>
                    </div>
                    <button className="btn btn-redeem rounded-pill px-4 py-2 border-0">
                      Redeem
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default Redeem;
