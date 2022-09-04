import "./App.css";
import React, { useState } from "react";

function App() {
	const [solar, setSolar] = useState([]);
	const houseEle = React.useRef(null);
	const [diffPos, setDiffPos] = useState({
		x: 0,
		y: 0,
	});

	const dragStartHandler = (e) => {
		e.dataTransfer.setData("text/plain", "original");
	};

	const dropHandler = (e) => {
		if (e.dataTransfer.getData("text") === "original") {
			setSolar([
				...solar,
				{
					x: e.clientX - houseEle.current.getBoundingClientRect().x - diffPos.x,
					y: e.clientY - houseEle.current.getBoundingClientRect().y - diffPos.y,
					id: randID(),
				},
			]);
		}

		e.preventDefault();
	};
	const ownDragHandler = (e) => {
		// Changing position only
		if (e.target.className === "eachSolar") {
			let cloneSoloar = [...solar];
			let obj = solar.find((item) => item.id === e.target.id);
			let index = solar.indexOf(obj);
			obj.x =
				e.clientX - houseEle.current.getBoundingClientRect().x - diffPos.x;
			obj.y =
				e.clientY - houseEle.current.getBoundingClientRect().y - diffPos.y;
			cloneSoloar[index] = obj;
			setSolar(cloneSoloar);
			e.preventDefault();
		}
	};
	const mouseDownHandler = (e) => {
		setDiffPos({
			...diffPos,
			x: e.clientX - e.target.getBoundingClientRect().x,
			y: e.clientY - e.target.getBoundingClientRect().y,
		});
	};
	let randID = () => {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	};
	return (
		<>
			<div className='App'>
				<div className='board'>
					<div
						ref={houseEle}
						className='house'
						onDragOver={(e) => e.preventDefault()}
						onDrop={dropHandler}>
						{solar &&
							solar.length > 0 &&
							solar.map((item) => {
								return (
									<img
										onMouseDown={mouseDownHandler}
										onDragEnd={ownDragHandler}
										draggable='true'
										key={item.id}
										id={item.id}
										src='/solar.png'
										width='30'
										height='50'
										className='eachSolar'
										style={{ left: item.x + "px", top: item.y + "px" }}
									/>
								);
							})}
						<img src='/home.png' style={{ pointerEvents: "none" }} />
					</div>
					<div className='soloarPanel'>
						<img
							draggable='true'
							onMouseDown={mouseDownHandler}
							onDragStart={dragStartHandler}
							src='/solar.png'
							width='30'
							height='50'
							className='clone'
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
