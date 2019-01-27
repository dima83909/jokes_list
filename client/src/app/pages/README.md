To generate new Angular page you can use:
waw generate page NAME
waw g p NAME
waw gp NAME

In case of complex page where you will need sub components, you can use:
waw generate multiplecomponent MULTINAME/NAME
waw g mc MULTINAME/NAME
waw gmc MULTINAME/NAME
which will create new sub component for specified page.
waw generate component NAME
waw g c NAME
waw gc NAME



const routes: Routes = [{
  path: '',
  loadChildren: './pages/land/land.module#LandModule'
}];
