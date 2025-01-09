import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { TTask, TTaskProps } from "./task.type";

const Task: React.FC<TTaskProps> = ({
  title,
  onPressClicked,
  onEditClicked,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    if (isChecked) return;
    setIsChecked(true);
  };
  return (
    <View style={styles.taskItem}>
      <Checkbox
        value={isChecked}
        onValueChange={handleCheckboxToggle}
      ></Checkbox>
      <TouchableOpacity>
        <Text style={[styles.task, isChecked ? styles.completed : styles.task]}>
          {title}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onEditClicked} disabled={isChecked}>
          <Text
            style={[
              styles.editButton,
              isChecked ? styles.completedDeleteBtn : styles.task,
            ]}
          >
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressClicked} disabled={isChecked}>
          <Text
            style={[
              styles.deleteButton,
              isChecked ? styles.completedDeleteBtn : styles.task,
            ]}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  const [taskText, setTaskText] = useState<string>("");
  const [tasks, setTasks] = useState<TTask[] | undefined>(undefined);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const addTask = () => {
    if (!taskText) return;

    const newId = uuidv4();
    const taskObj: TTask = { id: newId, task: taskText, isCompleted: false };
    if (!tasks) {
      setTasks([taskObj]);
    } else {
      setTasks([...tasks, taskObj]);
    }

    setTaskText("");
  };

  const handleDelete = (id: string) => {
    if (!id) return;

    setTasks(tasks?.filter((task) => id != task.id));
  };

  const handleEdit = (id: string, currentTask: string) => {
    setEditTaskId(id);
    setTaskText(currentTask);
  };

  const handleSaveEdit = () => {
    if (!editTaskId || !taskText) return;

    const updatedTasks = tasks?.map((task) =>
      task.id === editTaskId ? { ...task, task: taskText } : task
    );
    setTasks(updatedTasks);
    setTaskText("");
    setEditTaskId("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={taskText}
        onChangeText={(newTask) => setTaskText(newTask)}
      />
      {editTaskId ? (
        <TouchableOpacity style={styles.addButton} onPress={handleSaveEdit}>
          <Text style={styles.addText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addText}>Add Task</Text>
        </TouchableOpacity>
      )}

      {tasks?.map((tasks, id) => {
        return (
          <Task
            title={tasks.task}
            key={id}
            onPressClicked={() => {
              handleDelete(tasks.id);
            }}
            onEditClicked={() => handleEdit(tasks.id, tasks.task)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 2,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    color: "#ccc",
    fontSize: 15,
  },
  addButton: {
    backgroundColor: "#187c19",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  addText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  taskItemWrapper: {
    marginTop: 25,
  },
  taskItem: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  task: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  deleteButton: {
    color: "red",
  },
  completedDeleteBtn: {
    color: "#999",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  editButton: {
    color: "#007bff",
    fontSize: 14,
  },
  editContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default App;
