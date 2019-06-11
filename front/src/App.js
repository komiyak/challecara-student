import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App container">
            <h1 className="title">Challecara Student</h1>

            <div className="content">
                <p>チャレキャラへようこそ！</p>

                <p>
                    <strong>学校名</strong><br/>
                    ○○大学
                </p>

                <p>
                    <strong>あなたの名前</strong><br/>
                    田中 太郎
                </p>
            </div>

            <div className="content">
                セットアップを開始しますので、LINE アカウントでログインをお願いします。
            </div>

            <a className="button is-medium">
                <span className="icon">
                    <i className="fab fa-line"></i>
                </span>
                <span>LINEでログイン</span>
            </a>
        </div>
    );
}

export default App;
