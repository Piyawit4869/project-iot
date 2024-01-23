import {
	Button,
	Dropdown,
	Form,
	Input,
	MenuProps,
	Radio,
	Row,
	Space,
	Typography,
	Upload,
} from "antd";
import { ThemeColors } from "../../styles/theme";
import {
	DeleteOutlined,
	DownOutlined,
	PlusCircleFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const EditOrganizationPage = () => {
	const items: MenuProps["items"] = [
		{
			label: "นิติบุลคล",
			key: "1",
		},
		{
			label: "บุลคลธรรมดา",
			key: "2",
		},
	];
	const itemsDropdown: MenuProps["items"] = [
		{
			label: "บริษัทจำกัด",
			key: "1",
		},
		{
			label: "บริษัทมหาชน",
			key: "2",
		},
		{
			label: "ห้างหุ้นส่วนจำกัด",
			key: "3",
		},
		{
			label: "มูลนิธิ",
			key: "4",
		},
		{
			label: "สมาคม",
			key: "5",
		},
		{
			label: "กิจการร่วมค้า",
			key: "6",
		},
		{
			label: "อื่น ๆ",
			key: "7",
		},
	];

	const onClickItemDropdown: MenuProps["onClick"] = ({ key }) => {
		console.log("key", key);
	};

	return (
		<div>
			<div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Typography style={{ fontSize: "34px", fontWeight: 500 }}>
						แก้ไขข้อมูลกิจการ
					</Typography>
					<div style={{ marginBottom: "10px" }}>
						<Button
							style={{
								border: "0",
								height: "50px",
								width: "180px",
								marginRight: "10px",
								backgroundColor: ThemeColors.greenColor,
							}}
						>
							<Typography style={{ fontSize: "18px", color: "white" }}>
								บันทึก
							</Typography>
						</Button>
						<Link to={"/admin/organization"}>
							<Button
								style={{
									border: "0",
									height: "50px",
									width: "180px",
									marginRight: "10px",
									fontSize: "18px",
									backgroundColor: ThemeColors.waringColor,
									color: ThemeColors.whiteColor,
								}}
							>
								ยกเลิก
							</Button>
						</Link>
					</div>
				</div>
				<div
					style={{
						background: ThemeColors.goldColor,
						height: "3px",
					}}
				/>
			</div>
			<div>
				<div
					style={{
						marginTop: "20px",

						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<div style={{ width: "50%" }}>
						<Row style={{ marginBottom: "20px" }}>
							<div
								className="status"
								style={{
									width: "100%",
									height: "80px",
									backgroundColor: "white",
									padding: "10px 0 0 10px",

									borderRadius: "10px",
									// boxShadow: "2px 2px 2px 3px",
									boxShadow: "2px 2px 2px 2px" + ThemeColors.goldColor,
								}}
							>
								<Typography style={{ fontSize: "1.3rem" }}>
									รูปแบบธุรกิจ
								</Typography>
								<Form.Item>
									<Dropdown
										menu={{ items: items, onClick: onClickItemDropdown }}
									>
										<a onClick={(e) => e.preventDefault()}>
											<Space
												style={{
													width: "80%",
													display: "flex",
													justifyContent: "space-between",
													color: ThemeColors.lightOrangeColor,
												}}
											>
												นิติบุลคล
												<DownOutlined
													style={{ fontSize: "22px", width: "10px" }}
												/>
											</Space>
										</a>
									</Dropdown>
								</Form.Item>
							</div>
						</Row>
						<Row style={{ marginBottom: "20px" }}>
							<div
								style={{
									width: "100%",
									backgroundColor: "white",
									paddingTop: "10px",
									paddingLeft: "10px",
									borderRadius: "10px",
									boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
								}}
							>
								<Typography style={{ fontSize: "18px" }}>
									เลขทะเบียน 13 หลัก
								</Typography>
								<Form.Item>
									<Input
										type=""
										placeholder="0100565119323"
										bordered={false}
										style={{
											padding: "0px",
											fontSize: "16px",
											color: ThemeColors.orangeColor,
										}}
									/>
								</Form.Item>
							</div>
						</Row>
						<Row style={{ marginBottom: "10px" }}>
							<Radio>สำนักงานใหญ่</Radio>
							<Radio>สาขา</Radio>
						</Row>
					</div>
					<div
						style={{
							width: "50%",
							margin: "0px 10px 0px 10px",
							justifyContent: "space-between",
							display: "flex",
						}}
					>
						<div>
							<div style={{ marginLeft: "90px" }}>
								<Typography
									style={{
										color: ThemeColors.blackColor,
										fontSize: "16px",
										marginBottom: "10px",
										marginTop: "10px",
										fontWeight: "500",
									}}
								>
									โลโก้องค์กร
								</Typography>
								<Upload
									style={{ margin: "auto", alignItems: "center" }}
									listType="picture"
									accept=".png,.jpg.jpeg"
								>
									<Button
										icon={
											<PlusCircleFilled
												style={{
													color: ThemeColors.orangeColor,
													fontSize: "65px",
												}}
											/>
										}
										style={{
											border: "2px solid " + ThemeColors.orangeColor,
											height: "150px",
											width: "200px",
											marginRight: "10px",
											textAlign: "center",
											backgroundColor: ThemeColors.bgColor,
										}}
									></Button>
								</Upload>
							</div>
						</div>
						<Space direction="vertical" size={10} style={{ margin: "auto" }}>
							<Typography>รูปภาพควรจะเป็นอัตราส่วน 1:1</Typography>
							<Typography>ขนาดไฟล์ที่รองรับสูงสุด 3 MB</Typography>
							<Typography>รองรับไฟล์ประเภท .png, .jpg และ .jpeg</Typography>
						</Space>
					</div>
				</div>
			</div>
			<div style={{ display: "flex", marginBottom: "20px" }}>
				<div
					className="status"
					style={{
						width: "50%",
						height: "100px",
						backgroundColor: "white",
						padding: "10px 0 0 10px",
						marginRight: "20px",
						borderRadius: "10px",
						// boxShadow: "2px 2px 2px 3px",
						boxShadow: "2px 2px 2px 2px" + ThemeColors.goldColor,
					}}
				>
					<Typography style={{ fontSize: "1.3rem" }}>นิติบุลคล</Typography>
					<Form.Item>
						<Dropdown
							menu={{ items: itemsDropdown, onClick: onClickItemDropdown }}
						>
							<a onClick={(e) => e.preventDefault()}>
								<Space
									style={{
										width: "80%",
										display: "flex",
										justifyContent: "space-between",
										color: ThemeColors.lightOrangeColor,
									}}
								>
									นิติบุลคล
									<DownOutlined style={{ fontSize: "22px", width: "10px" }} />
								</Space>
							</a>
						</Dropdown>
					</Form.Item>
				</div>

				<div
					style={{
						width: "40%",
						backgroundColor: "white",
						paddingTop: "10px",
						paddingLeft: "10px",
						borderRadius: "10px",
						boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
						marginRight: "20px",
					}}
				>
					<Typography style={{ fontSize: "18px" }}>ชื่อกิจการ</Typography>
					<Form.Item>
						<Input
							type="ยูโทเทค"
							placeholder="ยูโทเทค"
							bordered={false}
							style={{
								padding: "0px",
								fontSize: "16px",
								color: ThemeColors.orangeColor,
							}}
						/>
					</Form.Item>
				</div>
			</div>
			<div
				style={{
					marginBottom: "50px",
					width: "50%",
					height: "80px",
					backgroundColor: "white",
					paddingTop: "10px",
					paddingLeft: "10px",
					borderRadius: "10px",
					boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
					marginRight: "20px",
				}}
			>
				<Typography style={{ fontSize: "18px" }}>คำอธิบายธุรกิจ</Typography>
				<Form.Item>
					<Input
						type="ยูโทเทค"
						placeholder="software house"
						bordered={false}
						style={{
							padding: "0px",
							fontSize: "16px",
							color: ThemeColors.orangeColor,
						}}
					/>
				</Form.Item>
				<Radio>จดทะเบียนภาษีมูลค่าเพิ่ม</Radio>
			</div>
			<div>
				<div>
					<Typography style={{ fontSize: "34px", fontWeight: 500 }}>
						ข้อมูลช่องทางการติดต่อ
					</Typography>
					<div style={{ marginBottom: "10px" }}></div>
				</div>
				<div
					style={{
						background: ThemeColors.goldColor,
						height: "3px",
					}}
				/>
			</div>
			<div style={{ margin: "20px 0 0px 0", display: "flex" }}>
				<div
					style={{
						marginBottom: "10px",
						width: "33%",
						height: "80px",
						backgroundColor: "white",
						paddingTop: "10px",
						paddingLeft: "10px",
						borderRadius: "10px",
						boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
						marginRight: "20px",
					}}
				>
					<Typography style={{ fontSize: "18px" }}>เบอร์โทร</Typography>
					<Form.Item>
						<Input
							placeholder="0804237373"
							bordered={false}
							style={{
								padding: "0px",
								fontSize: "16px",
								color: ThemeColors.orangeColor,
							}}
						/>
					</Form.Item>
				</div>
				<div
					style={{
						marginBottom: "10px",
						width: "33%",
						height: "80px",
						backgroundColor: "white",
						paddingTop: "10px",
						paddingLeft: "10px",
						borderRadius: "10px",
						boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
						marginRight: "20px",
					}}
				>
					<Typography style={{ fontSize: "18px" }}>อีเมล์</Typography>
					<Form.Item>
						<Input
							placeholder="kittiphoom@utotech.org"
							bordered={false}
							style={{
								padding: "0px",
								fontSize: "16px",
								color: ThemeColors.orangeColor,
							}}
						/>
					</Form.Item>
				</div>
				<div
					style={{
						marginBottom: "10px",
						width: "33%",
						height: "80px",
						backgroundColor: "white",
						paddingTop: "10px",
						paddingLeft: "10px",
						borderRadius: "10px",
						boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
						marginRight: "20px",
					}}
				>
					<Typography style={{ fontSize: "18px" }}>เว็บไซต์</Typography>
					<Form.Item>
						<Input
							placeholder="www.website.com"
							bordered={false}
							style={{
								padding: "0px",
								fontSize: "16px",
								color: ThemeColors.orangeColor,
							}}
						/>
					</Form.Item>
				</div>
			</div>
			<div>
				<div>
					<div>
						<Typography
							style={{ fontSize: "34px", fontWeight: 500, marginTop: "10px" }}
						>
							ข้อมูลที่อยู่กิจการ
						</Typography>
						<div style={{ marginBottom: "10px" }}></div>
					</div>
					<div
						style={{
							background: ThemeColors.goldColor,
							height: "3px",
							marginBottom: "20px",
						}}
					/>

					<Typography>ที่อยู่ตามทะเบียน</Typography>
					<div style={{ display: "flex", marginTop: "20px" }}>
						<div
							style={{
								marginBottom: "10px",
								width: "70%",
								height: "100px",
								backgroundColor: "white",
								paddingTop: "10px",
								paddingLeft: "10px",
								borderRadius: "10px",
								boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
								marginRight: "20px",
							}}
						>
							<Typography style={{ fontSize: "18px" }}>ที่อยู่</Typography>
							<Form.Item>
								<Input
									placeholder="ห้องเลขที่ 1454/127 ถนน เทพรัตน"
									bordered={false}
									style={{
										padding: "0px",
										fontSize: "16px",
										color: ThemeColors.orangeColor,
									}}
								/>
							</Form.Item>
						</div>
						<div
							className="status"
							style={{
								width: "50%",
								height: "100px",
								backgroundColor: "white",
								padding: "10px 0 0 10px",
								marginRight: "20px",
								borderRadius: "10px",
								// boxShadow: "2px 2px 2px 3px",
								boxShadow: "2px 2px 2px 2px" + ThemeColors.goldColor,
							}}
						>
							<Typography style={{ fontSize: "1.3rem" }}>ประเทศ</Typography>
							<Form.Item>
								<Dropdown menu={{ items: items, onClick: onClickItemDropdown }}>
									<a onClick={(e) => e.preventDefault()}>
										<Space
											style={{
												width: "80%",
												display: "flex",
												justifyContent: "space-between",
												color: ThemeColors.lightOrangeColor,
											}}
										>
											ไทย
											<DownOutlined
												style={{ fontSize: "22px", width: "10px" }}
											/>
										</Space>
									</a>
								</Dropdown>
							</Form.Item>
						</div>
					</div>
					<div>
						<Row style={{ marginTop: "20px" }}>
							<div
								style={{
									marginBottom: "10px",
									width: "33%",
									height: "100px",
									backgroundColor: "white",
									paddingTop: "10px",
									paddingLeft: "10px",
									borderRadius: "10px",
									boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
									marginRight: "20px",
								}}
							>
								<Typography style={{ fontSize: "18px" }}>แขวง/ตำบล</Typography>
								<Form.Item>
									<Input
										placeholder="บางนาใต้"
										bordered={false}
										style={{
											padding: "0px",
											fontSize: "16px",
											color: ThemeColors.orangeColor,
										}}
									/>
								</Form.Item>
							</div>
							<div
								style={{
									marginBottom: "10px",
									width: "32%",
									height: "100px",
									backgroundColor: "white",
									paddingTop: "10px",
									paddingLeft: "10px",
									borderRadius: "10px",
									boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
									marginRight: "20px",
								}}
							>
								<Typography style={{ fontSize: "18px" }}>เขต/อำเภอ</Typography>
								<Form.Item>
									<Input
										placeholder="บางนา"
										bordered={false}
										style={{
											padding: "0px",
											fontSize: "16px",
											color: ThemeColors.orangeColor,
										}}
									/>
								</Form.Item>
							</div>
							<div
								style={{
									marginBottom: "10px",
									width: "30%",
									height: "100px",
									backgroundColor: "white",
									paddingTop: "10px",
									paddingLeft: "10px",
									borderRadius: "10px",
									boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
									marginRight: "20px",
								}}
							>
								<Typography style={{ fontSize: "18px" }}>จังหวัด</Typography>
								<Form.Item>
									<Input
										placeholder="กรุงเทพมหานคร"
										bordered={false}
										style={{
											padding: "0px",
											fontSize: "16px",
											color: ThemeColors.orangeColor,
										}}
									/>
								</Form.Item>
							</div>
							<div
								style={{
									marginTop: "10px",
									marginBottom: "10px",
									width: "33%",
									height: "90px",
									backgroundColor: "white",
									paddingTop: "10px",
									paddingLeft: "10px",
									borderRadius: "10px",
									boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
									marginRight: "20px",
								}}
							>
								<Typography style={{ fontSize: "18px" }}>
									รหัสไปรษณีย์
								</Typography>
								<Form.Item>
									<Input
										placeholder="10260"
										bordered={false}
										style={{
											padding: "0px",
											fontSize: "16px",
											color: ThemeColors.orangeColor,
										}}
									/>
								</Form.Item>
							</div>
						</Row>
						<Row>
							<div style={{ display: "flex", marginTop: "10px" }}>
								<Space direction="horizontal" size={20}>
									<Typography style={{ fontWeight: "bold", fontSize: "16px" }}>
										ที่อยู่ส่งเอกสาร
									</Typography>
									<Radio>ใช้ข้อมูลเดียวกันกับที่อยู่ตามทะเบียน</Radio>
									<Radio>ใช้ข้อมูลใหม่</Radio>
								</Space>
							</div>
						</Row>
						<div style={{ display: "flex", marginTop: "20px" }}>
							<div
								style={{
									marginBottom: "10px",
									width: "70%",
									height: "100px",
									backgroundColor: "white",
									paddingTop: "10px",
									paddingLeft: "10px",
									borderRadius: "10px",
									boxShadow: "2px 2px 2px 2px" + ThemeColors.goldColor,
									marginRight: "20px",
								}}
							>
								<Typography style={{ fontSize: "18px" }}>ที่อยู่</Typography>
								<Form.Item>
									<Input
										placeholder="ห้องเลขที่ 1454/127 ถนน เทพรัตน"
										bordered={false}
										style={{
											padding: "0px",
											fontSize: "16px",
											color: ThemeColors.orangeColor,
										}}
									/>
								</Form.Item>
							</div>
							<div
								className="status"
								style={{
									width: "50%",
									height: "100px",
									backgroundColor: "white",
									padding: "10px 0 0 10px",
									marginRight: "20px",
									borderRadius: "10px",
									// boxShadow: "2px 2px 2px 3px",
									boxShadow: "2px 2px 5px 2px" + ThemeColors.goldColor,
								}}
							>
								<Typography style={{ fontSize: "1.3rem" }}>ประเทศ</Typography>
								<Form.Item>
									<Dropdown
										menu={{ items: items, onClick: onClickItemDropdown }}
									>
										<a onClick={(e) => e.preventDefault()}>
											<Space
												style={{
													width: "80%",
													display: "flex",
													justifyContent: "space-between",
													color: ThemeColors.lightOrangeColor,
												}}
											>
												ไทย
												<DownOutlined
													style={{ fontSize: "22px", width: "10px" }}
												/>
											</Space>
										</a>
									</Dropdown>
								</Form.Item>
							</div>
						</div>
					</div>
					<Row style={{ margin: "10px 0px 10px 0" }}>
						<div
							style={{
								marginBottom: "10px",
								width: "33%",
								height: "100px",
								backgroundColor: "white",
								paddingTop: "10px",
								paddingLeft: "10px",
								borderRadius: "10px",
								boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
								marginRight: "20px",
							}}
						>
							<Typography style={{ fontSize: "18px" }}>แขวง/ตำบล</Typography>
							<Form.Item>
								<Input
									placeholder="บางนาใต้"
									bordered={false}
									style={{
										padding: "0px",
										fontSize: "16px",
										color: ThemeColors.orangeColor,
									}}
								/>
							</Form.Item>
						</div>
						<div
							style={{
								marginBottom: "10px",
								width: "32%",
								height: "100px",
								backgroundColor: "white",
								paddingTop: "10px",
								paddingLeft: "10px",
								borderRadius: "10px",
								boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
								marginRight: "20px",
							}}
						>
							<Typography style={{ fontSize: "18px" }}>เขต/อำเภอ</Typography>
							<Form.Item>
								<Input
									placeholder="บางนา"
									bordered={false}
									style={{
										padding: "0px",
										fontSize: "16px",
										color: ThemeColors.orangeColor,
									}}
								/>
							</Form.Item>
						</div>
						<div
							style={{
								marginBottom: "10px",
								width: "30%",
								height: "100px",
								backgroundColor: "white",
								paddingTop: "10px",
								paddingLeft: "10px",
								borderRadius: "10px",
								boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
								marginRight: "20px",
							}}
						>
							<Typography style={{ fontSize: "18px" }}>จังหวัด</Typography>
							<Form.Item>
								<Input
									placeholder="กรุงเทพมหานคร"
									bordered={false}
									style={{
										padding: "0px",
										fontSize: "16px",
										color: ThemeColors.orangeColor,
									}}
								/>
							</Form.Item>
						</div>
						<div
							style={{
								marginTop: "10px",
								width: "33%",
								height: "100px",
								backgroundColor: "white",
								paddingTop: "10px",
								paddingLeft: "10px",
								borderRadius: "10px",
								boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
								marginRight: "20px",
							}}
						>
							<Typography style={{ fontSize: "18px" }}>รหัสไปรษณีย์</Typography>
							<Form.Item>
								<Input
									placeholder="10260"
									bordered={false}
									style={{
										padding: "0px",
										fontSize: "16px",
										color: ThemeColors.orangeColor,
									}}
								/>
							</Form.Item>
						</div>
					</Row>
				</div>
			</div>
			<div
				style={{
					marginTop: "30px",
					background: ThemeColors.goldColor,
					height: "3px",
					marginBottom: "20px",
				}}
			/>
			<Button
				icon={<DeleteOutlined style={{ fontSize: "22px" }} />}
				style={{
					border: "0",
					height: "50px",
					width: "180px",
					marginRight: "10px",
					fontSize: "18px",
					backgroundColor: ThemeColors.waringColor,
					color: ThemeColors.whiteColor,
				}}
			>
				ลบกิจการ
			</Button>
		</div>
	);
};
