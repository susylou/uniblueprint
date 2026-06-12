import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '687e0285849841ce8a87aecf7d84985d'
                    }
                    br0: {
                        table: 'sys_script'
                        id: 'cb29b9a76eac4985a6ec0b12ef64ecbe'
                        deleted: true
                    }
                    cs0: {
                        table: 'sys_script_client'
                        id: '2bf4bc624a1e455d8e24d13685f72688'
                        deleted: true
                    }
                    'headerfooter.au-footer': {
                        table: 'sp_header_footer'
                        id: 'faf671600edd4ded8afc7d3a22f8e126'
                    }
                    'headerfooter.au-header': {
                        table: 'sp_header_footer'
                        id: '0e30b868d116429c99008c81a1f75a0d'
                    }
                    'menu.au-student': {
                        table: 'sp_instance_menu'
                        id: '30a37aba03e74c06b67340f62bc711a8'
                    }
                    'menu.au-student.gethelp': {
                        table: 'sp_rectangle_menu_item'
                        id: '20893d6734e24f87a4d5d3ab3726ef30'
                    }
                    'menu.au-student.home': {
                        table: 'sp_rectangle_menu_item'
                        id: '846ecb321cc74f5f8573bba9a4c77419'
                    }
                    'menu.au-student.knowledge': {
                        table: 'sp_rectangle_menu_item'
                        id: 'e00971495d4f41ecaedface00df3e8d5'
                    }
                    'menu.au-student.myplace': {
                        table: 'sp_rectangle_menu_item'
                        id: 'c9150ab35b194e7784025592b3f30f6f'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '9b4934b80e0b4ce18a0467ac789bae90'
                    }
                    'page.gethelp.col.hub': {
                        table: 'sp_column'
                        id: 'e1e246ae357f40ad8eb720b770d83b45'
                    }
                    'page.gethelp.container.hub': {
                        table: 'sp_container'
                        id: 'dcebf4ff6b02444fa04cd23e9ae4aaf5'
                    }
                    'page.gethelp.instance.hub': {
                        table: 'sp_instance'
                        id: '4f0840a29735497da9b9c2254da3410f'
                    }
                    'page.gethelp.row.hub': {
                        table: 'sp_row'
                        id: '1639349903b6436b8af3e98a873046bc'
                    }
                    'page.home.col.hero': {
                        table: 'sp_column'
                        id: '2785e531ed934a4ba7176ae50bdf5c7c'
                    }
                    'page.home.col.kb': {
                        table: 'sp_column'
                        id: '412d28c59ed249559912f4ae5e9e2271'
                    }
                    'page.home.col.quick': {
                        table: 'sp_column'
                        id: '956121a0bf8649c99bf15811fff3c45e'
                    }
                    'page.home.col.today': {
                        table: 'sp_column'
                        id: 'afcd02e5a17c4f2d9592f56000b5d9e0'
                    }
                    'page.home.container.hero': {
                        table: 'sp_container'
                        id: '7d092ae657e049548cac8c0209b9e42a'
                    }
                    'page.home.container.kb': {
                        table: 'sp_container'
                        id: '2d6f9367331d48cf8d92db2986fa6332'
                    }
                    'page.home.container.quick': {
                        table: 'sp_container'
                        id: '58b8cb72771f4f84b6f2ca558ed6acb9'
                    }
                    'page.home.container.today': {
                        table: 'sp_container'
                        id: '614f784a44e646ed985bd9e33f30f4cd'
                    }
                    'page.home.instance.hero': {
                        table: 'sp_instance'
                        id: 'fe5183e4414c4f10a270e74a11e018b2'
                    }
                    'page.home.instance.kb': {
                        table: 'sp_instance'
                        id: 'aa0d7a6b53ef4b548268116a1f75dc2b'
                    }
                    'page.home.instance.quick': {
                        table: 'sp_instance'
                        id: '1a6a7ac8f4784624a84b5bda61233ce0'
                    }
                    'page.home.instance.today': {
                        table: 'sp_instance'
                        id: '22b9e4a804eb4f318003e094ec9ed897'
                    }
                    'page.home.row.hero': {
                        table: 'sp_row'
                        id: '56b1b5d56594411fa90c275e3c3ff50f'
                    }
                    'page.home.row.kb': {
                        table: 'sp_row'
                        id: '867ead43d3ed41c887cf46b6097639a1'
                    }
                    'page.home.row.quick': {
                        table: 'sp_row'
                        id: '45a3097a713c474da2c26bffba8bb9c2'
                    }
                    'page.home.row.today': {
                        table: 'sp_row'
                        id: 'a8348bc5c2304ef5b038a1ee61d37f9b'
                    }
                    'portal.au-student': {
                        table: 'sp_portal'
                        id: 'ad065ce613f849b88f2d7cbe2b8cb8e1'
                    }
                    src_server_script_ts: {
                        table: 'sys_module'
                        id: '8690f3c0fa2249d3a31dbea1ec3c0051'
                        deleted: true
                    }
                    'theme.aotearoa.coastal': {
                        table: 'sp_theme'
                        id: '4e8eaa19ea0b4e7c9dc0b6a9916f5a8c'
                    }
                    'widget.au-hero': {
                        table: 'sp_widget'
                        id: '33e7bec2e13541ab80cf470a63507d23'
                    }
                    'widget.au-hub-grid': {
                        table: 'sp_widget'
                        id: '31abd6989a194cd78a6127b37fe3edf7'
                    }
                    'widget.au-kb-rail': {
                        table: 'sp_widget'
                        id: 'e7a0117cc563428baca5ae899adacdb1'
                    }
                    'widget.au-quick-actions': {
                        table: 'sp_widget'
                        id: '26483e723fb341db815357da011436ea'
                    }
                    'widget.au-today': {
                        table: 'sp_widget'
                        id: '819a6f3e838c4a139297ac47bb5e4efb'
                    }
                }
                composite: [
                    {
                        table: 'sp_page'
                        id: '5a4cede851b147cf80b8928274019cb6'
                        key: {
                            id: 'au-home'
                        }
                    },
                    {
                        table: 'sp_page'
                        id: '7f8bf52c69184df9b445a047ba401dba'
                        key: {
                            id: 'au-get-help'
                        }
                    },
                    {
                        table: 'sp_page'
                        id: 'b419311741894016b8a57525b21cba3f'
                        deleted: true
                        key: {
                            id: 'home'
                        }
                    },
                ]
            }
        }
    }
}
