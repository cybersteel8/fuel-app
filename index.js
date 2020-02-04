var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import Plot from 'react-plotly.js';

var AddFuelModal = function (_React$Component) {
    _inherits(AddFuelModal, _React$Component);

    function AddFuelModal(props) {
        _classCallCheck(this, AddFuelModal);

        var _this = _possibleConstructorReturn(this, (AddFuelModal.__proto__ || Object.getPrototypeOf(AddFuelModal)).call(this, props));

        _this.state = {
            date: _this.props.prefill.date || "",
            consumption: _this.props.prefill.consumption || "",
            speed: _this.props.prefill.speed || "",
            fuel: _this.props.prefill.fuel || "",
            distance: _this.props.prefill.distance || ""
        };
        return _this;
    }

    _createClass(AddFuelModal, [{
        key: 'useCurrentDate',
        value: function useCurrentDate() {
            var now = new Date();
            var today = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
            this.setState({ date: today });
        }
    }, {
        key: 'handleInputChange',
        value: function handleInputChange(evt) {
            this.setState(_defineProperty({}, evt.target.name, evt.target.value));
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(evt) {
            var data = {
                id: this.props.prefill.id,
                date: this.state.date,
                consumption: this.state.consumption,
                speed: this.state.speed,
                fuel: this.state.fuel,
                distance: this.state.distance
            };

            if (this.props.editMode) {
                this.props.saveFn(data);
            } else {
                this.props.addFn(data);
            }
        }
    }, {
        key: 'handleDelete',
        value: function handleDelete(evt) {
            this.props.deleteFn(this.props.prefill.id);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { id: 'addFuelScreen' },
                React.createElement(
                    'p',
                    null,
                    this.props.editMode ? "Editing fuel log #" + this.props.prefill.id : "Add a new fuel log"
                ),
                React.createElement(
                    'table',
                    { id: 'addFuelTable' },
                    React.createElement(
                        'tbody',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                { className: 'modalLeftCol' },
                                'Filling Date'
                            ),
                            React.createElement(
                                'td',
                                { className: 'modalRightCol' },
                                React.createElement('input', { type: 'text',
                                    name: 'date',
                                    value: this.state.date,
                                    onChange: function onChange(evt) {
                                        return _this2.handleInputChange(evt);
                                    }
                                })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                { colSpan: '2' },
                                React.createElement(
                                    'button',
                                    { onClick: function onClick() {
                                            return _this2.useCurrentDate();
                                        } },
                                    'Use Today\'s Date'
                                )
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                { className: 'modalLeftCol' },
                                'Avg Consumption:'
                            ),
                            React.createElement(
                                'td',
                                { className: 'modalRightCol' },
                                React.createElement('input', { type: 'text',
                                    name: 'consumption',
                                    value: this.state.consumption,
                                    onChange: function onChange(evt) {
                                        return _this2.handleInputChange(evt);
                                    }
                                })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                { className: 'modalLeftCol' },
                                'Avg Speed:'
                            ),
                            React.createElement(
                                'td',
                                { className: 'modalRightCol' },
                                React.createElement('input', { type: 'text',
                                    name: 'speed',
                                    value: this.state.speed,
                                    onChange: function onChange(evt) {
                                        return _this2.handleInputChange(evt);
                                    }
                                })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                { className: 'modalLeftCol' },
                                'Fuel Consumed:'
                            ),
                            React.createElement(
                                'td',
                                { className: 'modalRightCol' },
                                React.createElement('input', { type: 'text',
                                    name: 'fuel',
                                    value: this.state.fuel,
                                    onChange: function onChange(evt) {
                                        return _this2.handleInputChange(evt);
                                    }
                                })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                { className: 'modalLeftCol' },
                                'Distance Travelled:'
                            ),
                            React.createElement(
                                'td',
                                { className: 'modalRightCol' },
                                React.createElement('input', { type: 'text',
                                    name: 'distance',
                                    value: this.state.distance,
                                    onChange: function onChange(evt) {
                                        return _this2.handleInputChange(evt);
                                    }
                                })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                { colSpan: '2' },
                                this.props.editMode ? React.createElement(
                                    'button',
                                    { type: 'submit', onClick: function onClick() {
                                            return _this2.handleSubmit();
                                        } },
                                    'Save'
                                ) : React.createElement(
                                    'button',
                                    { type: 'submit', onClick: function onClick() {
                                            return _this2.handleSubmit();
                                        } },
                                    'Add'
                                ),
                                React.createElement(
                                    'button',
                                    { onClick: this.props.closeFn },
                                    'Cancel'
                                ),
                                this.props.editMode ? React.createElement(
                                    'button',
                                    { type: 'submit', onClick: function onClick() {
                                            return _this2.handleDelete();
                                        } },
                                    'Delete'
                                ) : null
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AddFuelModal;
}(React.Component);

var FuelEntry = function (_React$Component2) {
    _inherits(FuelEntry, _React$Component2);

    function FuelEntry(props) {
        _classCallCheck(this, FuelEntry);

        return _possibleConstructorReturn(this, (FuelEntry.__proto__ || Object.getPrototypeOf(FuelEntry)).call(this, props));
    }

    _createClass(FuelEntry, [{
        key: 'render',
        value: function render() {
            var _this4 = this;

            var myDetailsForEditing = {
                id: this.props.id,
                date: this.props.date,
                consumption: this.props.consumption,
                speed: this.props.speed,
                fuel: this.props.fuel,
                distance: this.props.distance
            };

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    this.props.date
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.consumption
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.speed
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.fuel
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.distance
                ),
                this.props.editMode ? React.createElement(
                    'td',
                    null,
                    React.createElement('img', { src: '', className: 'editIcon', onClick: function onClick() {
                            return _this4.props.editFn(myDetailsForEditing);
                        } })
                ) : null
            );
        }
    }]);

    return FuelEntry;
}(React.Component);

var Main = function (_React$Component3) {
    _inherits(Main, _React$Component3);

    function Main(props) {
        _classCallCheck(this, Main);

        var _this5 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

        _this5.defaultPrefillData = {
            id: "",
            date: "",
            consumption: "",
            speed: "",
            fuel: "",
            distance: ""
        };

        _this5.state = {
            fuelEntries: [],
            previousFuelEntries: undefined,
            isEditModeEnabled: false,
            isFuelModalOpen: false,
            fuelModalPrefill: _this5.defaultPrefillData
        };
        return _this5;
    }

    _createClass(Main, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this6 = this;

            $.getJSON("http://localhost/fuel/all", null, function (result) {
                return _this6.setState({ fuelEntries: result });
            });
        }
    }, {
        key: 'openFuelModal',
        value: function openFuelModal(prefill) {
            this.setState({
                isFuelModalOpen: true,
                fuelModalPrefill: prefill || this.defaultPrefillData
            });
        }
    }, {
        key: 'closeFuelModal',
        value: function closeFuelModal(editedData) {
            if (editedData) {
                var newFuelEntries = this.state.fuelEntries;
                var index = newFuelEntries.findIndex(function (entry) {
                    return entry.id == editedData.id;
                });
                if (index > -1) {
                    newFuelEntries[index] = editedData;
                    this.setState({ fuelEntries: newFuelEntries });
                } else {
                    console.error("Cannot find existing fuel entry to update!", editedData);
                }
            }

            this.setState({
                isFuelModalOpen: false,
                fuelModalPrefill: this.defaultPrefillData
            });
        }
    }, {
        key: 'addFuelEntry',
        value: function addFuelEntry(entry) {
            var _this7 = this;

            $.post({
                url: "http://localhost/fuel/add",
                data: entry
            }).done(function (serverResponse) {
                // alert("Success");
                var newFuelEntries = _this7.state.fuelEntries;
                newFuelEntries.push({
                    id: serverResponse.id,
                    date: entry.date,
                    consumption: entry.consumption,
                    speed: entry.speed,
                    fuel: entry.fuel,
                    distance: entry.distance
                });
                _this7.setState({ fuelEntries: newFuelEntries });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert("Error!");
                console.log(jqXHR.responseJSON);
            }).always(function () {
                _this7.closeFuelModal();
            });
        }
    }, {
        key: 'deleteFuelEntry',
        value: function deleteFuelEntry(id) {
            var newFuelEntries = this.state.fuelEntries;
            var index = newFuelEntries.findIndex(function (entry) {
                return entry.id == id;
            });
            newFuelEntries.splice(index, 1);
            this.setState({ fuelEntries: newFuelEntries });
            this.closeFuelModal();
        }
    }, {
        key: 'enableEditMode',
        value: function enableEditMode() {
            this.setState({
                isEditModeEnabled: true,
                previousFuelEntries: this.state.fuelEntries.slice()
            });
        }
    }, {
        key: 'saveEditedData',
        value: function saveEditedData() {
            var _this8 = this;

            $.ajax({
                url: "http://localhost/fuel/saveAll",
                data: JSON.stringify(this.state.fuelEntries),
                method: "PUT",
                contentType: "application/json; charset=UTF-8"
            }).done(function () {
                // alert("Saved successfully");
            }).fail(function (jqXHR) {
                alert("Error while saving! Check browser console.");
                console.log(jqXHR.responseJSON);
            }).always(function () {
                _this8.setState({
                    isEditModeEnabled: false,
                    previousFuelEntries: undefined
                });
            });
        }
    }, {
        key: 'discardEditedData',
        value: function discardEditedData() {
            this.setState({
                isEditModeEnabled: false,
                fuelEntries: this.state.previousFuelEntries.slice(),
                previousFuelEntries: undefined
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var dates = [new Date(2020, 1, 1), new Date(2020, 1, 2), new Date(2020, 1, 3), new Date(2020, 1, 4), new Date(2020, 1, 5), new Date(2020, 1, 6), new Date(2020, 1, 7), new Date(2020, 1, 8), new Date(2020, 1, 9)];

            var graph = [{
                x: dates,
                y: [10, 20, 30, 40, 50, 60, 70, 80, 90],
                type: 'scatter'
            }];

            return React.createElement(
                'div',
                { id: 'siteContainer' },
                this.state.isFuelModalOpen ? React.createElement(AddFuelModal, {
                    editMode: this.state.isEditModeEnabled,
                    closeFn: function closeFn() {
                        return _this9.closeFuelModal();
                    },
                    addFn: function addFn(entry) {
                        return _this9.addFuelEntry(entry);
                    },
                    saveFn: function saveFn(editedData) {
                        return _this9.closeFuelModal(editedData);
                    },
                    deleteFn: function deleteFn(id) {
                        return _this9.deleteFuelEntry(id);
                    },
                    prefill: this.state.fuelModalPrefill
                }) : null,
                React.createElement(
                    'h1',
                    { id: 'heading' },
                    'Astra Fuel Tracking!'
                ),
                this.state.isEditModeEnabled ? React.createElement(
                    'div',
                    { id: 'buttonContainer' },
                    React.createElement(
                        'button',
                        { type: 'button', className: 'mainButton', id: 'saveButton', onClick: function onClick() {
                                return _this9.saveEditedData();
                            } },
                        'Save'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', className: 'mainButton', id: 'discardButton', onClick: function onClick() {
                                return _this9.discardEditedData();
                            } },
                        'Discard'
                    )
                ) : React.createElement(
                    'div',
                    { id: 'buttonContainer' },
                    React.createElement(
                        'button',
                        { type: 'button', className: 'mainButton', id: 'addButton', onClick: function onClick() {
                                return _this9.openFuelModal();
                            } },
                        'Add'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', className: 'mainButton', id: 'editButton', onClick: function onClick() {
                                return _this9.enableEditMode();
                            } },
                        'Edit'
                    )
                ),
                React.createElement(
                    'table',
                    { id: 'fuelTable' },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                'Filling Date'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Avg. Consumption (L/100km)'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Avg. Speed (km/h)'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Fuel consumed (L)'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Distance travelled (km)'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.state.fuelEntries.map(function (entry) {
                            return React.createElement(FuelEntry, {
                                key: entry.id,
                                id: entry.id,
                                date: entry.date,
                                consumption: entry.consumption,
                                speed: entry.speed,
                                fuel: entry.fuel,
                                distance: entry.distance,
                                editMode: _this9.state.isEditModeEnabled,
                                editFn: function editFn(prefill) {
                                    return _this9.openFuelModal(prefill);
                                }
                            });
                        })
                    )
                ),
                React.createElement(Plot, { data: graph })
            );
        }
    }]);

    return Main;
}(React.Component);

/**
 * This is a wrapper around the entry point of the application to gracefully catch and handle any errors in the application.
 * They currently get logged to the browser's console and a simple message is displayed on screen.
 */


var ErrorBoundary = function (_React$Component4) {
    _inherits(ErrorBoundary, _React$Component4);

    function ErrorBoundary(props) {
        _classCallCheck(this, ErrorBoundary);

        var _this10 = _possibleConstructorReturn(this, (ErrorBoundary.__proto__ || Object.getPrototypeOf(ErrorBoundary)).call(this, props));

        _this10.state = { hasError: false };
        return _this10;
    }

    _createClass(ErrorBoundary, [{
        key: 'componentDidCatch',
        value: function componentDidCatch(error, errorInfo) {
            console.log(error, errorInfo);
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.hasError) {
                return React.createElement(
                    'h1',
                    null,
                    'Something went wrong. Check the console.'
                );
            }
            return this.props.children;
        }
    }], [{
        key: 'getDerivedStateFromError',
        value: function getDerivedStateFromError(error) {
            return { hasError: true };
        }
    }]);

    return ErrorBoundary;
}(React.Component);

ReactDOM.render(React.createElement(
    ErrorBoundary,
    null,
    React.createElement(Main, null)
), document.getElementById("root"));