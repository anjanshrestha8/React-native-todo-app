export type TTask = {
  id: string;
  task: string;
  isCompleted?: boolean;
};

export type TTaskProps = {
  title: string;
  onPressClicked: () => void;
  onEditClicked: () => void;
};
