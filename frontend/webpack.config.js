module.exports = {
            entry:'./src/react-app/index.js',
            output: {
                path: __dirname+'/src/public',
                filename: 'bundle.js'
            },
            module:{
                rules:[
                        {
                                
                                    use: 'babel-loader',
                                    test: /\.(js|png|jp(e*)g|gif|css)$/,
                                    exclude: /node_modules/

                        },
                        {
                            test: /\.css$/,
                            use: [
                                'style-loader',
                                'css-loader'
                            ]
                        },
                        {
                            
                                test: /\.svg$/,
                                use: ['@svgr/webpack'],
                             
                        }
                ]           
            },
};