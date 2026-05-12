import { AppProvider } from './app/AppProvider';
import { DashboardDocs } from './screens/DashboardDocs';

export default function App() {
  return (
    <AppProvider>
      <DashboardDocs />
    </AppProvider>
  );
}
