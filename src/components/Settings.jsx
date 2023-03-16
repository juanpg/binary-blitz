// import KeyboardMapEntry from "./KeyboardMapEntry";

import { useState, useRef, useEffect } from "react";

function Settings({currentSettings, setCurrentSettings}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mapping, setMapping] = useState(currentSettings.split(''));
    const [valid, setValid] = useState(true);
    const inputRefs = useRef([]);
    const closeRef = useRef(null);
    const submitRef = useRef(null);
    const dialogRef = useRef(null);

    const onControlChange = (control) => {
        setMapping(ms => ms.map((v, idx) => idx === activeIndex ? control : v));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const s = new Set(mapping);
        if(s.size === 8) {
            setValid(vl => true);
            setCurrentSettings(mapping.join(''));
            if(closeRef.current) {
                closeRef.current.click();
            }
        } else {
            // Show error
            setValid(vl => false);
            setActiveIndex(idx => 0);
            inputRefs.current[0].focus();
        }
    }

    const onRestore = (e) => {
        e.preventDefault();
        setMapping(ms => 'asdfjkl;'.split(''));
    }

    useEffect(() => {
        if (inputRefs.current[activeIndex]) {
            inputRefs.current[activeIndex].focus();
        }
    }, [activeIndex]);

    useEffect(() => {
        document.querySelector("#settingsDialog").addEventListener('show.bs.modal', (event) => {
            setMapping(mp => currentSettings.split(''));
            setValid(vl => true);
        });
        document.querySelector("#settingsDialog").addEventListener('shown.bs.modal', (event) => {
            setActiveIndex(idx => 0);
            inputRefs.current[0].focus();
        })
    }, [currentSettings]);

    const handleKeyDown = (event) => {
        event.preventDefault();
        switch (event.key) {
        case "Backspace":
            onControlChange(' ');
            if (activeIndex > 0) {
                setActiveIndex(activeIndex - 1);
            }
            break;
        default:
            const control = event.key.toLowerCase();
            if (control.trim().length === 1 && /^[a-zA-Z0-9[\]/\\();,.'`´^²&é"+ç¡ñ\-=è_çà]*$/.test(control)) {
                onControlChange(control);
                if (activeIndex < inputRefs.current.length - 1) {
                    setActiveIndex(idx => activeIndex + 1);
                } else {
                    submitRef.current.focus();
                }
            }
            break;
        }
    };

    const handleInputClick = (index) => {
        setActiveIndex(index);
    };

    const renderInputs = () => {
        const inputs = [];
        for (let i = 0; i < 8; i++) {
            inputs.push(
                <div key={i} className="key mb-3 d-inline-flex flex-column align-items-center">
                    <label className="form-label fw-bold">{2 ** (7 - i)}</label>
                    <input
                        key={i}
                        type="text"
                        maxLength="1"
                        ref={(el) => (inputRefs.current[i] = el)}
                        value={mapping[i]}
                        readOnly
                        onKeyDown={handleKeyDown}
                        onClick={() => handleInputClick(i)}
                        className={`form-control fs-3 text-center`}
                    />
                </div>
                
            );
        }
        return inputs;
    };

    return (
        <div ref={dialogRef} className="modal fade" id="settingsDialog" tabIndex="-1" aria-labelledby="settingsTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                         <h1 className="modal-title fs-5" id="settingsTitle">Keyboard Mapping</h1>
                         <button type="button" ref={closeRef} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div className="modal-body">
                        <form>
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label">To remap, select the first bit that you want to change, and then press the key on the keyboard. When you're satisfied with the changes, click the 'Save' button, or click the 'Restore' button to reset the game's configuration.</label>
                                </div>
                            </div>
                            <div className="row mb-3 settings">
                                {renderInputs()}
                            </div>
                            {!valid && 
                                <div className="row mb-3">
                                    <div className="col-md">
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <svg style={{width: '1em', height: '1em', fill: 'currentColor'}} xmlns="http://www.w3.org/2000/svg" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                            </svg>
                                            <div>
                                                Invalid combination set. Please try again.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="row mb-3">
                                <div className="col-md d-flex gap-3 justify-content-center">
                                    <button ref={submitRef} type="Submit" className="btn btn-primary w-25" onClick={onSubmit}>Save</button>
                                    <button type="Button" className="btn btn-secondary w-25" onClick={onRestore}>Restore</button>
                                </div>
                            </div>
                        </form>
                     </div>
                </div>
            </div>
        </div>
    );

    // return <div className="keyboard-control">{renderInputs()}</div>;


    // const onKeyChange = (bit, newKey) => {

    // }

    // const onSubmit = (e) => {
    //     e.preventDefault();
    // }

    // return (
    //     <div className="modal fade" id="settingsDialog" tabIndex="-1" aria-labelledby="settingsTitle" aria-hidden="true">
    //         <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
    //             <div className="modal-content">
    //                 <div className="modal-header">
    //                     <h1 className="modal-title fs-5" id="settingsTitle">Keyboard Mapping</h1>
    //                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //                 </div>
    //                 <div className="modal-body">
    //                     <form onSubmit={onSubmit}>
    //                         <div className="row g-2">
    //                             {['128', '64', '32', '16', '8', '4', '2', '1'].map((bit, index) => {
    //                               return <KeyboardMapEntry key={bit} label={bit} currentKey={currentSettings[index]} onKeyChange={onKeyChange} />
    //                             })}
    //                         </div>
    //                         <button className="w-100 btn btn-primary rounded-3" type="submit">Save</button>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default Settings;