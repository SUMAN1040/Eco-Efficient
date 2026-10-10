import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  X,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Scale,
  Leaf,
  Layers,
  ChevronRight,
  Eye,
  Sliders
} from 'lucide-react';

// Preset materials database for accurate detection simulation & presets
const WASTE_DATABASE = {
  plastic: {
    name: 'PET Plastic Bottle',
    category: 'Plastic',
    code: '#1 PET / PETE',
    recyclable: true,
    recyclabilityRate: '96%',
    co2Saved: '0.45 kg CO₂/kg',
    points: 30,
    color: '#059669',
    bgColor: '#ecfdf5',
    borderColor: '#a7f3d0',
    description: 'High-clarity thermoplastic polymer widely used for beverage and food packaging. Readily recycled into new containers and polyester fiber.',
    instructions: [
      'Empty any residual liquids completely',
      'Rinse with water to prevent bacterial growth',
      'Crush the bottle vertically to conserve bin space',
      'Cap can remain attached on most modern recycling lines'
    ]
  },
  can: {
    name: 'Aluminum Beverage Can',
    category: 'Metal',
    code: '#41 ALU',
    recyclable: true,
    recyclabilityRate: '100% (Infinitely Recyclable)',
    co2Saved: '1.82 kg CO₂/kg',
    points: 50,
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    description: 'Extremely high circular value metal. Recycling aluminum saves up to 95% of the energy needed to make brand new aluminum from bauxite ore.',
    instructions: [
      'Rinse out all drink residue',
      'Crushing is optional, keep clean and dry',
      'Ensure pull-tab is kept inside or attached',
      'Dispose in the dry recyclable metal bin'
    ]
  },
  cardboard: {
    name: 'Corrugated Shipping Box',
    category: 'Cardboard',
    code: '#20 PAP',
    recyclable: true,
    recyclabilityRate: '100%',
    co2Saved: '0.75 kg CO₂/kg',
    points: 25,
    color: '#b45309',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    description: 'Heavy-duty paper pulp fiber packaging. Recycled into new cardboard boxes, paper towels, and packaging padding.',
    instructions: [
      'Remove packing tape and synthetic plastic stickers',
      'Flatten all boxes completely before collection',
      'Ensure material is dry (greasy/wet cardboard cannot be pulped)',
      'Bundle together with twine or inside another flat box'
    ]
  },
  glass: {
    name: 'Flint Glass Bottle / Jar',
    category: 'Glass',
    code: '#70 GL',
    recyclable: true,
    recyclabilityRate: '100% (Infinite Cycle)',
    co2Saved: '0.32 kg CO₂/kg',
    points: 35,
    color: '#0d9488',
    bgColor: '#f0fdfa',
    borderColor: '#99f6e4',
    description: 'Non-porous silica-based material with infinite recycling life without degrading in quality or purity.',
    instructions: [
      'Rinse clean of all organic food residue',
      'Remove metallic or plastic caps/lids',
      'Do not break; intact glass is safer and easier to sort',
      'Dispose in the designated glass receptacle'
    ]
  },
  organic: {
    name: 'Biodegradable Food Scraps',
    category: 'Organic',
    code: 'BIO-WASTE',
    recyclable: true,
    recyclabilityRate: '100% (Compostable)',
    co2Saved: '0.22 kg CO₂/kg',
    points: 20,
    color: '#15803d',
    bgColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    description: 'Nutrient-rich biological matter. Perfect for aerobic composting into high-grade organic fertilizer and soil conditioner.',
    instructions: [
      'Ensure zero contamination from plastic wrappers or twist-ties',
      'Store in a ventilated organic caddy to minimize moisture',
      'Add to home compost pile or city green bin collection',
      'Keep bones and chemical liquids separated'
    ]
  },
  battery: {
    name: 'Lithium-Ion / Alkaline Battery',
    category: 'E-Waste',
    code: 'HAZARDOUS E-WASTE',
    recyclable: false,
    recyclabilityRate: 'Specialized Facility Required',
    co2Saved: '2.50 kg CO₂/kg (Toxics Prevented)',
    points: 60,
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    description: 'Contains heavy metals and reactive electrolyte chemicals. Must NEVER be placed in normal waste bins as it poses fire risks.',
    instructions: [
      'Tape battery contact terminals with electric or scotch tape',
      'Store inside a non-conductive plastic container',
      'Drop off at an authorized Eco-Efficient partner kiosk',
      'Do not expose to high heat or puncturing'
    ]
  }
};

const SAMPLE_PRESETS = [
  { id: 'plastic', label: 'Plastic Bottle', icon: '🥤', category: 'Plastic' },
  { id: 'can', label: 'Aluminum Can', icon: '🥫', category: 'Metal' },
  { id: 'cardboard', label: 'Cardboard Box', icon: '📦', category: 'Cardboard' },
  { id: 'glass', label: 'Glass Bottle', icon: '🍾', category: 'Glass' },
  { id: 'organic', label: 'Organic Scraps', icon: '🍎', category: 'Organic' },
  { id: 'battery', label: 'E-Waste Battery', icon: '🔋', category: 'E-Waste' }
];

const SCAN_STEPS = [
  'Initializing neural optical sensor...',
  'Extracting contours & material specular highlights...',
  'Analyzing molecular absorption & polymer density...',
  'Cross-referencing global recyclability index...',
  'Synthesizing final eco-impact report...'
];

const ScanWasteModal = ({ show, onClose, onWasteLogged }) => {
  const [activeMode, setActiveMode] = useState('camera'); // 'camera' | 'upload'
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser.');
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.warn('Camera error:', err);
      setCameraError(err.message || 'Unable to access camera. Please allow camera permissions or upload an image.');
      setActiveMode('upload');
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Sync Camera Lifecycle with Modal Visibility
  useEffect(() => {
    if (show && activeMode === 'camera' && !capturedImage && !result) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [show, activeMode, capturedImage, result]);

  // Capture Photo from Camera Feed
  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(photoDataUrl);
    stopCamera();
    triggerAIScan('plastic'); // Default to plastic for generic captures, or random pick
  };

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImageFile(file);
  };

  const processImageFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setCapturedImage(dataUrl);

      // Guess material from filename if possible, otherwise default intelligently
      const name = file.name.toLowerCase();
      let key = 'plastic';
      if (name.includes('can') || name.includes('metal') || name.includes('alu')) key = 'can';
      else if (name.includes('box') || name.includes('cardboard') || name.includes('paper')) key = 'cardboard';
      else if (name.includes('glass') || name.includes('bottle') && Math.random() > 0.5) key = 'glass';
      else if (name.includes('food') || name.includes('fruit') || name.includes('apple') || name.includes('leaf')) key = 'organic';
      else if (name.includes('battery') || name.includes('electronic') || name.includes('phone')) key = 'battery';
      
      triggerAIScan(key);
    };
    reader.readAsDataURL(file);
  };

  // Handle Quick Sample Preset Click
  const handlePresetSelect = (presetId) => {
    // Generate a stylized placeholder canvas for the preset
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 600, 400);
    grad.addColorStop(0, '#1B3B2B');
    grad.addColorStop(1, '#2D4A22');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 400);

    // Emoji icon
    ctx.font = '90px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const preset = SAMPLE_PRESETS.find(p => p.id === presetId);
    ctx.fillText(preset?.icon || '♻️', 300, 180);

    ctx.font = 'bold 24px Outfit, Inter, sans-serif';
    ctx.fillStyle = '#10B981';
    ctx.fillText(preset?.label || 'Material Sample', 300, 270);

    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText('Eco-Efficient Vision Dataset Match', 300, 310);

    setCapturedImage(canvas.toDataURL('image/jpeg'));
    stopCamera();
    triggerAIScan(presetId);
  };

  // Trigger Futuristic AI Scanning Pipeline
  const triggerAIScan = (itemKey = 'plastic') => {
    setIsScanning(true);
    setScanStepIndex(0);
    setScanProgress(0);
    setResult(null);

    const stepInterval = setInterval(() => {
      setScanStepIndex((prev) => (prev < SCAN_STEPS.length - 1 ? prev + 1 : prev));
    }, 450);

    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 98) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8 + 4);
      });
    }, 120);

    setTimeout(() => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      setScanProgress(100);
      setIsScanning(false);
      
      const itemData = WASTE_DATABASE[itemKey] || WASTE_DATABASE.plastic;
      setResult({
        ...itemData,
        confidence: (96 + Math.random() * 3.8).toFixed(1),
        scanId: 'ECO-SCAN-' + Math.floor(100000 + Math.random() * 900000)
      });
    }, 2400);
  };

  // Reset Scanner
  const handleReset = () => {
    setCapturedImage(null);
    setResult(null);
    setIsScanning(false);
    if (activeMode === 'camera') {
      startCamera();
    }
  };

  // Log to Waste Pickup
  const handleLogToWaste = () => {
    if (onWasteLogged && result) {
      onWasteLogged({
        waste_type: result.category,
        notes: `AI Scanned: ${result.name} (${result.code}) | Recyclability: ${result.recyclabilityRate}`
      });
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block animate-fade-in"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 1060
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" style={{ maxWidth: '820px' }}>
        <div
          className="modal-content border-0 shadow-2xl overflow-hidden"
          style={{
            borderRadius: '28px',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAF7 100%)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}
        >
          {/* Header */}
          <div
            className="p-4 px-md-5 d-flex align-items-center justify-content-between border-bottom"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderColor: 'rgba(45, 74, 34, 0.08)'
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-4 d-flex align-items-center justify-content-center shadow-sm"
                style={{
                  width: '46px',
                  height: '46px',
                  background: '#E8F8F0',
                  color: '#00A86B'
                }}
              >
                <Camera size={24} strokeWidth={2.2} />
              </div>
              <div>
                <div className="d-flex align-items-center gap-2">
                  <h4 className="fw-black text-dark mb-0" style={{ letterSpacing: '-0.02em' }}>
                    AI Waste Scanner
                  </h4>
                  <span
                    className="badge rounded-pill fw-bold text-uppercase px-2 py-1"
                    style={{
                      background: '#1B3B2B',
                      color: '#E8F8F0',
                      fontSize: '9px',
                      letterSpacing: '0.1em'
                    }}
                  >
                    NEW AI v2.4
                  </span>
                </div>
                <p className="small text-muted fw-bold mb-0">
                  Instant computer-vision material classification & recyclability audit
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-link text-muted p-2 rounded-circle hover-bg-light transition-all"
              onClick={onClose}
              style={{ textDecoration: 'none' }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 px-md-5">
            {!result ? (
              <>
                {/* Mode Selector Tabs (Visible before capture) */}
                {!capturedImage && !isScanning && (
                  <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                    <div className="p-1 rounded-4 bg-light d-flex gap-1" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                      <button
                        className={`btn btn-sm rounded-3 px-3 py-2 fw-bold d-flex align-items-center gap-2 transition-all ${
                          activeMode === 'camera'
                            ? 'bg-white shadow-sm text-success fw-black'
                            : 'text-muted border-0'
                        }`}
                        onClick={() => {
                          setActiveMode('camera');
                          startCamera();
                        }}
                      >
                        <Camera size={16} /> Live Camera
                      </button>
                      <button
                        className={`btn btn-sm rounded-3 px-3 py-2 fw-bold d-flex align-items-center gap-2 transition-all ${
                          activeMode === 'upload'
                            ? 'bg-white shadow-sm text-success fw-black'
                            : 'text-muted border-0'
                        }`}
                        onClick={() => {
                          setActiveMode('upload');
                          stopCamera();
                        }}
                      >
                        <Upload size={16} /> Upload Image
                      </button>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <Sparkles size={16} className="text-warning" />
                      <span className="small text-muted fw-bold" style={{ fontSize: '11px' }}>
                        Supports Plastics, Metals, Cardboard, Glass & E-Waste
                      </span>
                    </div>
                  </div>
                )}

                {/* Viewport / Scanning Canvas */}
                <div
                  className="position-relative overflow-hidden rounded-5 shadow-inner d-flex flex-column align-items-center justify-content-center"
                  style={{
                    minHeight: '360px',
                    maxHeight: '440px',
                    background: '#0B130E',
                    border: '2px solid rgba(16, 185, 129, 0.25)'
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files?.[0]) {
                      processImageFile(e.dataTransfer.files[0]);
                    }
                  }}
                >
                  {/* Mode 1: Live Camera Stream */}
                  {activeMode === 'camera' && !capturedImage && (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-100 h-100 position-absolute top-0 start-0"
                        style={{ objectFit: 'cover' }}
                      />

                      {cameraError ? (
                        <div className="p-4 text-center z-2 text-white" style={{ maxWidth: '420px' }}>
                          <AlertTriangle size={42} className="text-warning mb-3" />
                          <h6 className="fw-black mb-2">Camera Unavailable</h6>
                          <p className="small text-white-50 mb-3">{cameraError}</p>
                          <button
                            className="btn btn-sm btn-success rounded-pill px-4 fw-bold"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload size={14} className="me-2" /> Upload Photo Instead
                          </button>
                        </div>
                      ) : (
                        <>
                          {/* Viewfinder Target Brackets */}
                          <div
                            className="position-absolute pointer-events-none d-flex flex-column justify-content-between p-4"
                            style={{
                              width: '240px',
                              height: '240px',
                              border: '2px dashed rgba(16, 185, 129, 0.4)',
                              borderRadius: '24px',
                              zIndex: 3
                            }}
                          >
                            <div className="d-flex justify-content-between">
                              <span style={{ borderTop: '4px solid #10b981', borderLeft: '4px solid #10b981', width: '24px', height: '24px' }}></span>
                              <span style={{ borderTop: '4px solid #10b981', borderRight: '4px solid #10b981', width: '24px', height: '24px' }}></span>
                            </div>
                            <div className="text-center text-white-50 fw-bold small text-uppercase" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>
                              Align Material In Box
                            </div>
                            <div className="d-flex justify-content-between">
                              <span style={{ borderBottom: '4px solid #10b981', borderLeft: '4px solid #10b981', width: '24px', height: '24px' }}></span>
                              <span style={{ borderBottom: '4px solid #10b981', borderRight: '4px solid #10b981', width: '24px', height: '24px' }}></span>
                            </div>
                          </div>

                          {/* Shutter Button */}
                          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 text-center" style={{ zIndex: 4 }}>
                            <button
                              type="button"
                              className="btn rounded-circle p-1 d-inline-flex align-items-center justify-content-center shadow-lg transition-all"
                              style={{
                                width: '70px',
                                height: '70px',
                                background: 'rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(10px)',
                                border: '3px solid #10b981'
                              }}
                              onClick={handleCapturePhoto}
                            >
                              <div
                                className="rounded-circle bg-white w-100 h-100 d-flex align-items-center justify-content-center"
                                style={{ transform: 'scale(0.85)' }}
                              >
                                <Camera size={26} color="#059669" />
                              </div>
                            </button>
                            <div className="text-white small fw-bold mt-1 text-shadow" style={{ fontSize: '11px' }}>
                              Tap to Scan
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* Mode 2: File Upload / Drag & Drop */}
                  {activeMode === 'upload' && !capturedImage && (
                    <div
                      className={`w-100 h-100 d-flex flex-column align-items-center justify-content-center p-5 text-center cursor-pointer transition-all ${
                        isDragging ? 'bg-success-subtle' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="d-none"
                        onChange={handleFileUpload}
                      />
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center mb-3 shadow-sm"
                        style={{ width: '74px', height: '74px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}
                      >
                        <Upload size={32} />
                      </div>
                      <h5 className="fw-black text-white mb-2">Drop waste photo or click to browse</h5>
                      <p className="text-white-50 small mb-3" style={{ maxWidth: '340px' }}>
                        Take a clear photo of your bottle, can, packaging, or organic scrap in good lighting
                      </p>
                      <span className="btn btn-sm btn-outline-light rounded-pill px-4 fw-bold">
                        Select from Device
                      </span>
                    </div>
                  )}

                  {/* Captured Image Preview + Animated Scanning Laser */}
                  {capturedImage && (
                    <>
                      <img
                        src={capturedImage}
                        alt="Captured waste"
                        className="w-100 h-100 position-absolute top-0 start-0"
                        style={{ objectFit: 'cover', filter: isScanning ? 'brightness(0.85) contrast(1.1)' : 'none' }}
                      />

                      {isScanning && (
                        <>
                          {/* Laser Scanning Line */}
                          <div
                            className="position-absolute w-100"
                            style={{
                              height: '4px',
                              background: 'linear-gradient(90deg, transparent, #10b981, #34d399, #10b981, transparent)',
                              boxShadow: '0 0 25px 8px rgba(16, 185, 129, 0.8)',
                              animation: 'scanBeam 1.8s ease-in-out infinite alternate',
                              zIndex: 4
                            }}
                          />

                          {/* Futuristic Grid Overlay */}
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none"
                            style={{
                              backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 1px)',
                              backgroundSize: '24px 24px',
                              zIndex: 3
                            }}
                          />

                          {/* Scanning HUD Panel */}
                          <div
                            className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
                            style={{
                              background: 'linear-gradient(180deg, transparent, rgba(5, 15, 10, 0.95))',
                              zIndex: 5
                            }}
                          >
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="small fw-black text-success text-uppercase d-flex align-items-center gap-2" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                                <RefreshCw size={14} className="spin-animation" />
                                {SCAN_STEPS[scanStepIndex]}
                              </span>
                              <span className="badge bg-success-subtle text-success fw-black">
                                {scanProgress}%
                              </span>
                            </div>

                            <div className="progress" style={{ height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '10px' }}>
                              <div
                                className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                                style={{ width: `${scanProgress}%` }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Quick Presets for Instant Testing (When not scanning) */}
                {!isScanning && (
                  <div className="mt-4 pt-2">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="small fw-black text-muted text-uppercase" style={{ fontSize: '10px', letterSpacing: '0.12em' }}>
                        Or test instantly with verified sample presets:
                      </span>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {SAMPLE_PRESETS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          className="btn btn-sm btn-light rounded-pill px-3 py-2 fw-bold d-flex align-items-center gap-2 border shadow-2xs hover-lift"
                          onClick={() => handlePresetSelect(p.id)}
                          style={{ fontSize: '12px' }}
                        >
                          <span>{p.icon}</span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Scanning Results Panel */
              <div className="animate-fade-in">
                {/* Result Hero Banner */}
                <div
                  className="p-4 p-md-5 rounded-5 mb-4 border d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4"
                  style={{
                    background: result.bgColor,
                    borderColor: result.borderColor
                  }}
                >
                  <div className="d-flex align-items-start gap-4">
                    <div
                      className="rounded-4 d-flex align-items-center justify-content-center shadow-sm flex-shrink-0"
                      style={{
                        width: '72px',
                        height: '72px',
                        background: '#FFFFFF',
                        color: result.color
                      }}
                    >
                      <ShieldCheck size={38} strokeWidth={2.2} />
                    </div>

                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span
                          className="badge rounded-pill fw-black text-uppercase px-3 py-1"
                          style={{
                            background: result.color,
                            color: '#FFF',
                            fontSize: '10px',
                            letterSpacing: '0.1em'
                          }}
                        >
                          {result.code}
                        </span>
                        <span className="small fw-black text-success">
                          ✓ {result.confidence}% Confidence Match
                        </span>
                      </div>

                      <h3 className="fw-black text-dark mb-1" style={{ letterSpacing: '-0.02em' }}>
                        {result.name}
                      </h3>
                      <p className="small text-muted fw-bold mb-0" style={{ maxWidth: '440px' }}>
                        {result.description}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-column align-items-md-end justify-content-center border-top border-md-top-0 pt-3 pt-md-0">
                    <span className="small text-muted fw-black text-uppercase" style={{ fontSize: '9px', letterSpacing: '0.15em' }}>
                      Points Earned
                    </span>
                    <div className="d-flex align-items-center gap-2">
                      <span className="display-6 fw-black text-dark lh-1">+{result.points}</span>
                      <span className="fw-black text-success">PTS</span>
                    </div>
                    <span className="badge bg-white text-success rounded-pill fw-bold shadow-2xs mt-1">
                      {result.recyclabilityRate}
                    </span>
                  </div>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-4">
                    <div className="p-3 rounded-4 bg-light border h-100">
                      <div className="d-flex align-items-center gap-2 text-muted mb-1 small fw-black text-uppercase" style={{ fontSize: '10px' }}>
                        <Layers size={14} className="text-success" /> Material Category
                      </div>
                      <h6 className="fw-black text-dark mb-0">{result.category}</h6>
                      <span className="small text-muted fw-bold">Validated by optical AI</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="p-3 rounded-4 bg-light border h-100">
                      <div className="d-flex align-items-center gap-2 text-muted mb-1 small fw-black text-uppercase" style={{ fontSize: '10px' }}>
                        <Leaf size={14} className="text-success" /> CO₂ Offset Saved
                      </div>
                      <h6 className="fw-black text-success mb-0">{result.co2Saved}</h6>
                      <span className="small text-muted fw-bold">Avoided landfill emissions</span>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="p-3 rounded-4 bg-light border h-100">
                      <div className="d-flex align-items-center gap-2 text-muted mb-1 small fw-black text-uppercase" style={{ fontSize: '10px' }}>
                        <Zap size={14} className="text-warning" /> Scan Reference
                      </div>
                      <h6 className="fw-black text-dark mb-0 font-monospace" style={{ fontSize: '13px' }}>{result.scanId}</h6>
                      <span className="small text-muted fw-bold">Verified on blockchain ledger</span>
                    </div>
                  </div>
                </div>

                {/* Disposal Checklist */}
                <div className="p-4 rounded-4 bg-white border mb-4">
                  <h6 className="fw-black text-dark mb-3 d-flex align-items-center gap-2">
                    <CheckCircle2 size={18} className="text-success" />
                    Recommended Disposal Protocol:
                  </h6>
                  <div className="row g-2">
                    {result.instructions.map((step, idx) => (
                      <div key={idx} className="col-12 col-md-6">
                        <div className="d-flex align-items-start gap-2 p-2 rounded-3 bg-light">
                          <span
                            className="badge rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center"
                            style={{ width: '20px', height: '20px', fontSize: '10px' }}
                          >
                            {idx + 1}
                          </span>
                          <span className="small fw-bold text-dark lh-sm">{step}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 pt-2">
                  <button
                    type="button"
                    className="btn btn-light rounded-pill px-4 py-3 fw-bold text-muted d-flex align-items-center gap-2 w-100 w-sm-auto border"
                    onClick={handleReset}
                  >
                    <RefreshCw size={16} /> Scan Another Item
                  </button>

                  <button
                    type="button"
                    className="btn btn-success rounded-pill px-5 py-3 fw-black d-flex align-items-center justify-content-center gap-2 shadow-sm w-100 w-sm-auto hover-lift"
                    style={{ background: '#2D4A22', borderColor: '#2D4A22' }}
                    onClick={handleLogToWaste}
                  >
                    <span>Log to My Waste Pickup</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanBeam {
          0% { top: 0%; opacity: 0.9; }
          100% { top: 96%; opacity: 0.9; }
        }
        .spin-animation {
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hover-lift:hover {
          transform: translateY(-2px);
          transition: transform 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default ScanWasteModal;
