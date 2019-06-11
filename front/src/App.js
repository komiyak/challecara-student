import React from 'react';
import 'App.scss';

function App() {
    return (
        <div className="App container">
            <h1 className="title">Challecara!</h1>

            <div className="content">
                <p>チャレキャラ2019へようこそ！</p>

                <p>
                    <strong>あなたのお名前</strong><br/>
                    田中 太郎
                </p>
            </div>

            <div className="content">
                セットアップを開始しますので、LINE アカウントでログインをお願いします。
            </div>

            <p>
                {/* eslint-disable-next-line */}
                <a className="buttonLineLogin" href='#'>LINE Login</a>
            </p>
        </div>
    );
}

export default App;
