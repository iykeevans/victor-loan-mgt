import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';


const rootElement = document.querySelector('#root') as Element;
const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<>Saas Starter</>
	</StrictMode>
);
