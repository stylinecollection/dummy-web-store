<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: black; /*#636b6f*/
                font-family: sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: black;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="position-ref full-height">
<!--             @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>
                        <a href="{{ route('register') }}">Register</a>
                    @endauth
                </div>
            @endif -->

            <div class="content">
                <div class="title m-b-md">
                    Products
                </div>

                <div class="links">
                    @if(isset($products))
                    @foreach($products as $product)
                        <p>                            
                            <img src="<?php echo 'https://s3-eu-west-
1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ef4e860a-1d01-4e5c-a6a8-427cfa48a668/'.$product->relationships->files->data[0]->id.'.jpg'; ?>" height="220" width="220"><br>
                            ID:{{$product->id}}<br>
                            Name:{{$product->name}}<br>
                            SKU:{{$product->sku}}<br>
                            Price: {{$product->price[0]->amount}}<br>
                            Stock: {{$product->meta->stock->level}}<br>
                        </p>
                    @endforeach
                    @else
                        <p>No Product Found!</p>
                    @endif
                </div>
            </div>
        </div>
    </body>
</html>
