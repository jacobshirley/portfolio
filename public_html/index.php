<?php
use \Twig\Loader\Filesystem;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once '../vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('assets/templates/');

$twig = new Twig_Environment($loader);

$c = new \Slim\Container();
$app = new \Slim\App($c);

$app->get('/', function (Request $request, Response $response) {
    global $twig;
    $response->getBody()->write($twig->render("index.html"));

    return $response;
});

$app->get('/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');

	global $twig;
    $response->getBody()->write($twig->render($name . ".html"));

    return $response;
});

$app->get('/api/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');

	global $twig;
    $template = $twig->load($name . ".html");

    $response->getBody()->write($template->render(array("api" => true)));

    return $response;
});

$app->run();
