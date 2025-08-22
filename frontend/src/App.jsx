import AppRouter from "./router/AppRouter";
import { SidebarProvider } from './context/SidebarContext';
import { AuthProvider } from './context/AuthContext';
import { TableProvider } from "./context/TableContext";

function App() {
	return (
		<AuthProvider>
			<SidebarProvider>
				<TableProvider>
					<AppRouter />
				</TableProvider>
			</SidebarProvider>
		</AuthProvider>
	)
}

export default App