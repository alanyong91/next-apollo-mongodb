import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TodoList from './../components/TodoList'

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="nextjs-apollo-mongodb todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Todo List
        </h1>

        <TodoList />
      </main>
    </div>
  )
}

export default Home