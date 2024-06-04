import React, { useRef } from 'react';
import { Tabs, Tab, TabPanel } from '@deque/cauldron-react';

const MyTabs = () => {
	const tabRef1 = useRef() as React.RefObject<HTMLDivElement>
	const tabRef2 = useRef() as React.RefObject<HTMLDivElement>
	const tabRef3 = useRef() as React.RefObject<HTMLDivElement>
	return (
		<>
			<Tabs aria-label='Horizontal Tabs'>
				<Tab target={tabRef1}>Tab 1</Tab>
				<Tab target={tabRef2}>Tab 2</Tab>
				<Tab target={tabRef3}>Tab 3</Tab>
			</Tabs>
			<TabPanel ref={tabRef1}>Panel for Horizontal Tabs (1)</TabPanel>
			<TabPanel ref={tabRef2}>Panel for Horizontal Tabs (2)</TabPanel>
			<TabPanel ref={tabRef3}>Panel for Horizontal Tabs (3)</TabPanel>
		</>
	);
};

export default MyTabs