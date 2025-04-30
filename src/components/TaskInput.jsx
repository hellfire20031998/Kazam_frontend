import { useState } from 'react';
import mqtt from 'mqtt';

function TaskInput() {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  // Connect to the MQTT broker (using WebSocket protocol)
  const client = mqtt.connect('ws://localhost:9001', {
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  });

  // Publish task message to the MQTT broker
  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim()) {
      try {
        // Ensure the client is connected before publishing
        if (client.connected) {
          client.publish('/add', task, (err) => {
            if (err) {
              setError('Error publishing task. Please try again.');
            } else {
              setTask('');
              setError('');
            }
          });
        } else {
          setError('MQTT client not connected.');
        }
      } catch (error) {
        setError('Error publishing task. Please try again.');
      }
    } else {
      setError('Please enter a task.');
    }
  };

  // Handle MQTT client connection errors and successful connection
  client.on('connect', () => {
    console.log('MQTT client connected');
  });

  client.on('error', (err) => {
    console.log('MQTT connection error:', err);
    setError('MQTT connection error. Please try again later.');
  });

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task..."
      />
      <button type="submit" disabled={!task.trim()}>
        Add Task
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskInput;
