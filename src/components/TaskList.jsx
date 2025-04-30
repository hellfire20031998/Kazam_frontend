import { useState, useEffect } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/fetchAllTasks')
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.items)) {
          setTasks(data.items);
          setLoading(false);
        } else {
          setError('Failed to load tasks: Invalid data format');
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(`Failed to load tasks: ${err.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.length === 0 ? (
          <li>No tasks found</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index+1}>{task}</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TaskList;
