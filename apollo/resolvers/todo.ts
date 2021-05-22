import TodoModel from './../models/Todo';

export default {
  Query: {
    getTodoList: async () => {
      try {
        return await TodoModel.find({});;
      } catch (error) {
        throw error;
      }
    },
    getTodoTask: async (_: any, {id }: { id: number }) => {
      try {
        return await TodoModel.findById(id);
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    addTask: async (_: any, { input } : {input: { task: string }}) => {
      try {
        return await TodoModel.create(input);
      } catch (error) {
        throw error;
      }
    },
    updateTask: async (_: any, { id, input } : {id: string, input: { task: string }}) => {
      try {
        return await TodoModel.findOneAndUpdate({ _id: id }, { $set: input }, { new: true });
      } catch (error) {
        throw error;
      }
    },
    removeTask: async (_: any, { id } : { id: string }) => {
      try {
        await TodoModel.findOneAndDelete({ _id: id });
        return true
      } catch (error) {
        throw error;
      }
    }
  }
};
