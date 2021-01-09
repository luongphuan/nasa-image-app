import './App.css';
import Spinner from '@components/Spinner';
import Tabs from '@components/Tabs'

function App() {
  return (
    <div className="App">
      <div>
        <h1>Nasa Image Application</h1>
        <input name="text" type="text" placeholder="Search" />
        <Spinner isLoading={false}>
          <Tabs>
            <div label="All data">
              See ya later, <em>Alligator</em>!
            </div>
            <div label="Liked data">
              After 'while, <em>Crocodile</em>!
            </div>
            <div label="Removed data">
              Nothing to see here, this tab is <em>extinct</em>!
            </div>
          </Tabs>
        </Spinner>
      </div>
    </div>
  );
}

export default App;
