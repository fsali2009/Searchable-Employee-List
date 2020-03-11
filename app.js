
class ContactRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.contact.name}</td>
        <td>{this.props.contact.phone}</td>
        <td>{this.props.contact.email}</td>
      </tr>
    );
  }
}

class ContactTable extends React.Component {
  render() {
    var rows = [];
    this.props.contacts.forEach((contact) => {
      if (contact.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<ContactRow contact={contact} />);
    });
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

class FilterableContactTable extends React.Component {
  constructor(props) {
    super(props);
    // FilterableContactTable is the owner of the state as the filterText is needed in both nodes (searchbar and table) that are below in the hierarchy tree.
    this.state = {
      filterText: ''
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);

  }

  handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    this.setState({
      filterText: filterText
    });
    //React knows the state has changed, and calls render() method again to learn what should be on the screen
  }

  render() {
    return (
      <div><h1>Some Company Name One</h1>
        <h3>Employee Contact List</h3>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <ContactTable
          contacts={this.props.contacts}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}


var CONTACTS = [
  { name: 'Trish Ryan', phone: '312-111-1333', email: 'trish1@gmail.com' },
  { name: 'Sylvia Delgado', phone: '312-222-2888', email: 'sylvia@gmail.com' },
  { name: 'Maggie Salinas', phone: '312-333-3111', email: 'maggies@gmail.com' },
  { name: 'Margie Giannerini', phone: '312-444-4333', email: 'mgiannerini@gmail.com' },
  { name: 'Gina Giannerini', phone: '312-555-5333', email: 'ginam@gmail.com' },
  { name: 'Maya Giannerini', phone: '312-666-5333', email: 'mayag1@gmail.com' },
  { name: 'Alex Salinas', phone: '312-777-5333', email: 'alex9696@gmail.com' },
  { name: 'Anthony Delgado Giannerini', phone: '312-888-5333', email: 'anthony123@gmail.com' },
  { name: 'Micheal Delgado', phone: '312-999-5333', email: 'michalealBaseball@gmail.com' },
  { name: 'Henry Delgado', phone: '312-000-5333', email: 'henrysmile@gmail.com' },


];

ReactDOM.render(
  <FilterableContactTable contacts={CONTACTS} />,
  document.getElementById('root')
);
