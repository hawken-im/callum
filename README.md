It's a platform to ask ,answer and share questions, built on quorum block chain.

这是一个区块链上的问答平台，既然在区块链上，规划资金的流向可说是一个关键。
“同问”上有两种资金：
1. 悬赏金，由提问人和同问人支付。
2. 购买回答的费用，由购买人支付。

针对全部五个角色，在某一个问题里的作用，这里做出如下设计：
1. 提问人提出问题，发起悬赏。
2. 答题人回答问题。
3. 投票人使用自己的仅有的一张票投给自己认为最佳的答案。
4. 同问人表示自己有同样的问题，追加赏金。
5. 问题成功解决后，购买人可以购买最高票数的回答。

当问题成功解决后，最高票数的回答将得到90%的赏金，所有投票人均分剩余10%。
最高票的回答，除本问题的参与人外，对所有人不可见，需要购买才可见。
本问题的参与人就是：提问人，答题人，投票人，同问人，购买人。

问题被购买，收入将分配给提问人，答题人，同问人三个角色。分配方式为：
1. 收入的10%分配给答题人。
2. 剩余的90%，按照提问人和同问人的赏金比例进行分配。


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
