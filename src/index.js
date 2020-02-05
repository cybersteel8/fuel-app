import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Plot from 'react-plotly.js';

class AddFuelModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.prefill.date || "",
            consumption: this.props.prefill.consumption || "",
            speed: this.props.prefill.speed || "",
            fuel: this.props.prefill.fuel || "",
            distance: this.props.prefill.distance || ""
        };
    }

    useCurrentDate() {
        let now = new Date();
        let today = now.getDate() + "-" + (now.getMonth()+1) + "-" + now.getFullYear();
        this.setState({date: today});
    }

    handleInputChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit(evt) {
        let data = {
            id: this.props.prefill.id,
            date: this.state.date,
            consumption: this.state.consumption,
            speed: this.state.speed,
            fuel: this.state.fuel,
            distance: this.state.distance
        };
        
        if(this.props.editMode) {
            this.props.saveFn(data);
        } else {
            this.props.addFn(data);
        }
    }

    handleDelete(evt) {
        this.props.deleteFn(this.props.prefill.id);
    }

    render() {
        return <div id="addFuelScreen">
            <p>{this.props.editMode ? "Editing fuel log #"+this.props.prefill.id:"Add a new fuel log"}</p>
            <table id="addFuelTable">
                <tbody>
                    <tr>
                        <td className="modalLeftCol">Filling Date</td>
                        <td className="modalRightCol"><input type="text"
                            name="date"
                            value={this.state.date}
                            onChange={(evt) => this.handleInputChange(evt)}
                        /></td>
                    </tr>
                    <tr><td colSpan="2"><button onClick={() => this.useCurrentDate()}>Use Today's Date</button></td></tr>
                    <tr>
                        <td className="modalLeftCol">Avg Consumption:</td>
                        <td className="modalRightCol"><input type="text"
                            name="consumption"
                            value={this.state.consumption}
                            onChange={(evt) => this.handleInputChange(evt)}
                        /></td>
                    </tr>
                    <tr>
                        <td className="modalLeftCol">Avg Speed:</td>
                        <td className="modalRightCol"><input type="text"
                            name="speed"
                            value={this.state.speed}
                            onChange={(evt) => this.handleInputChange(evt)}
                        /></td>
                    </tr>
                    <tr>
                        <td className="modalLeftCol">Fuel Consumed:</td>
                        <td className="modalRightCol"><input type="text"
                            name="fuel"
                            value={this.state.fuel}
                            onChange={(evt) => this.handleInputChange(evt)}
                        /></td>
                    </tr>
                    <tr>
                        <td className="modalLeftCol">Distance Travelled:</td>
                        <td className="modalRightCol"><input type="text"
                            name="distance"
                            value={this.state.distance}
                            onChange={(evt) => this.handleInputChange(evt)}
                        /></td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            {this.props.editMode ? <button type="submit" onClick={() => this.handleSubmit()}>Save</button>
                            :<button type="submit" onClick={() => this.handleSubmit()}>Add</button>}
                            <button onClick={this.props.closeFn}>Cancel</button>
                            {this.props.editMode ? <button type="submit" onClick={() => this.handleDelete()}>Delete</button>:null}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}

class FuelEntry extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let myDetailsForEditing = {
            id: this.props.id,
            date: this.props.date,
            consumption: this.props.consumption,
            speed: this.props.speed,
            fuel: this.props.fuel,
            distance: this.props.distance,
        }

        return(<tr>
            <td>{this.props.date}</td>
            <td>{this.props.consumption}</td>
            <td>{this.props.speed}</td>
            <td>{this.props.fuel}</td>
            <td>{this.props.distance}</td>
            {this.props.editMode ? <td><img src="" className="editIcon" onClick={() => this.props.editFn(myDetailsForEditing)}/></td> : null}
        </tr>)
    }
}

class FuelGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [],
            values: []
        }
    }

    parseDate(date) {
        let parsedDate = new Date();
        let parts = date.split("-");
        // console.log(parts);
        parsedDate.setDate(parts[0]);
        parsedDate.setMonth(parts[1]-1);
        parsedDate.setFullYear(parts[2]);
        // console.log(parsedDate.toDateString());
        return parsedDate;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps != this.props) {
            let dates = [];
            let values = []
            this.props.fuelEntries.forEach((entry) => {
                dates.push(this.parseDate(entry.date));
                values.push(entry.consumption);
            });

            this.setState({
                dates: dates,
                values: values
            });
        }
    }

    render() {
        console.log("Rendering FuelGraph", this.props.fuelEntries);
        return(
            <Plot
                data={[{
                    x: this.state.dates,
                    y: this.state.values,
                    type: 'scatter'
                }]}
                layout={{title: "Consumption over time"}}
            />
        )
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
        
        this.defaultPrefillData = {
            id: "",
            date: "",
            consumption: "",
            speed: "",
            fuel: "",
            distance: "",
        };

        this.state = {
            fuelEntries: [],
            previousFuelEntries: undefined,
            isEditModeEnabled: false,
            isFuelModalOpen: false,
            fuelModalPrefill: this.defaultPrefillData
        }
    }

    componentDidMount() {
        $.getJSON("http://localhost/fuel/all", null, (result) => this.setState({fuelEntries: result}));
    }

    openFuelModal(prefill) {
        this.setState({
            isFuelModalOpen: true,
            fuelModalPrefill: prefill || this.defaultPrefillData
        });
    }

    closeFuelModal(editedData) {
        if(editedData) {
            let newFuelEntries = this.state.fuelEntries;
            let index = newFuelEntries.findIndex(entry => entry.id == editedData.id);
            if(index > -1) {
                newFuelEntries[index] = editedData;
                this.setState({fuelEntries: newFuelEntries});
            } else {
                console.error("Cannot find existing fuel entry to update!",editedData);
            }
        }

        this.setState({
            isFuelModalOpen: false,
            fuelModalPrefill: this.defaultPrefillData
        });
    }
    
    addFuelEntry(entry) {
        $.post({
            url: "http://localhost/fuel/add",
            data: entry
        }).done((serverResponse) => {
            // alert("Success");
            let newFuelEntries = this.state.fuelEntries;
            newFuelEntries.push({
                    id: serverResponse.id,
                    date: entry.date,
                    consumption: entry.consumption,
                    speed: entry.speed,
                    fuel: entry.fuel,
                    distance: entry.distance,
            });
            this.setState({fuelEntries: newFuelEntries});
        }).fail((jqXHR, textStatus, errorThrown) => {
            alert("Error!");
            console.log(jqXHR.responseJSON);
        }).always(() => {
            this.closeFuelModal();
        });
    }

    deleteFuelEntry(id) {
        let newFuelEntries = this.state.fuelEntries;
        let index = newFuelEntries.findIndex((entry) => entry.id == id);
        newFuelEntries.splice(index,1);
        this.setState({fuelEntries: newFuelEntries});
        this.closeFuelModal();
    }

    enableEditMode() {
        this.setState({
            isEditModeEnabled: true,
            previousFuelEntries: this.state.fuelEntries.slice()
        });
    }

    saveEditedData() {
        $.ajax({
            url: "http://localhost/fuel/saveAll",
            data: JSON.stringify(this.state.fuelEntries),
            method: "PUT",
            contentType: "application/json; charset=UTF-8",
        }).done(() => {
            // alert("Saved successfully");
        }).fail((jqXHR) => {
            alert("Error while saving! Check browser console.");
            console.log(jqXHR.responseJSON);
        }).always(() => {
            this.setState({
                isEditModeEnabled: false,
                previousFuelEntries: undefined
            });
        });
    }

    discardEditedData() {
        this.setState({
            isEditModeEnabled: false,
            fuelEntries: this.state.previousFuelEntries.slice(),
            previousFuelEntries: undefined
        });
    }
    render() {
        return(
        <div id="siteContainer">
            {this.state.isFuelModalOpen ?
                <AddFuelModal
                    editMode={this.state.isEditModeEnabled}
                    closeFn={() => this.closeFuelModal()}
                    addFn={(entry) => this.addFuelEntry(entry)}
                    saveFn={(editedData) => this.closeFuelModal(editedData)}
                    deleteFn={(id) => this.deleteFuelEntry(id)}
                    prefill={this.state.fuelModalPrefill}
                />: null}
            <h1 id="heading">Astra Fuel Tracking!</h1>
            {this.state.isEditModeEnabled ?
                <div id="buttonContainer">
                    <button type="button" className="mainButton" id="saveButton" onClick={() => this.saveEditedData()}>Save</button>
                    <button type="button" className="mainButton" id="discardButton" onClick={() => this.discardEditedData()}>Discard</button>
                </div>
            :
                <div id="buttonContainer">
                    <button type="button" className="mainButton" id="addButton" onClick={() => this.openFuelModal()}>Add</button>
                    <button type="button" className="mainButton" id="editButton" onClick={() => this.enableEditMode()}>Edit</button>
                </div>
            }
            <table id="fuelTable">
                <thead><tr>
                    <th>Filling Date</th>
                    <th>Avg. Consumption (L/100km)</th>
                    <th>Avg. Speed (km/h)</th>
                    <th>Fuel consumed (L)</th>
                    <th>Distance travelled (km)</th>
                </tr></thead>
                <tbody>{this.state.fuelEntries.map(entry =>
                    <FuelEntry
                        key={entry.id}
                        id={entry.id}
                        date={entry.date}
                        consumption={entry.consumption}
                        speed={entry.speed}
                        fuel={entry.fuel}
                        distance={entry.distance}
                        editMode={this.state.isEditModeEnabled}
                        editFn={(prefill) => this.openFuelModal(prefill)}
                    />)}</tbody>
            </table>
            <FuelGraph fuelEntries={this.state.fuelEntries}/>
        </div>)
    }
}

/**
 * This is a wrapper around the entry point of the application to gracefully catch and handle any errors in the application.
 * They currently get logged to the browser's console and a simple message is displayed on screen.
 */
class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong. Check the console.</h1>;
      }
      return this.props.children; 
    }
}
ReactDOM.render(<ErrorBoundary><Main /></ErrorBoundary>, document.getElementById("root"));