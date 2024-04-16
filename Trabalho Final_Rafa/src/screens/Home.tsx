import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, FlatList, View } from "react-native";
import Animated, {
  BounceInDown,
  FlipInYRight,
  FlipOutYRight,
} from "react-native-reanimated";
import { UserContext } from "../contexts/UserContext";
import { TaskContext } from "../contexts/TaskContext";
import WeekCalendar from "../components/WeekCalendar";
import ItemCard from "../components/ItemCard";
import CategoryItem from "../components/CategoryItem";
import { categories } from "../utils/data/todos";

const Home = () => {
  const { user } = useContext(UserContext);
  const {
    taskList,
    selectedCategory,
    formatedToday,
    handleSelectCategory,
    handleRemoveTask,
    handleDoneTask,
    db,
    getTasks,
  } = useContext(TaskContext);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists tasks (id integer primary key not null, completed int, title text, category text, date text, images text);"
      );
    });
    getTasks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Olá, {user?.firstName.toUpperCase()}! Hoje é {formatedToday}
      </Text>

      <WeekCalendar />

      <Animated.FlatList
        entering={BounceInDown}
        style={styles.categoriesContainer}
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            handleSelectCategory={handleSelectCategory}
            selectedCategory={selectedCategory}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      {taskList && taskList.length > 0 ? (
        <Animated.FlatList
          entering={FlipInYRight}
          exiting={FlipOutYRight}
          style={styles.taskListContainer}
          data={taskList}
          renderItem={({ item }) => (
            <ItemCard
              task={item}
              handleRemoveTask={handleRemoveTask}
              handleDoneTask={handleDoneTask}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Animated.View
          entering={BounceInDown}
          style={styles.noTasksContainer}
        >
          <Text style={styles.noTasksText}>
            {selectedCategory === "done"
              ? "Nenhuma tarefa concluída ainda! 😢"
              : "Nenhuma tarefa encontrada! 😋"}
          </Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05171E",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoriesContainer: {
    maxHeight: 70,
    marginBottom: 20,
  },
  taskListContainer: {
    flex: 1,
    width: "100%",
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTasksText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default Home;
