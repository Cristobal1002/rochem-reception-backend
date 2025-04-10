export const GET_ORDERS_QUERY = `
    SELECT
        A.[PONUMBER] AS NumeroOrdenCompra,
    CASE A.[POSTATUS]
        WHEN 1 THEN 'NUEVO'
        WHEN 2 THEN 'LIBERADO'
        WHEN 3 THEN 'ORDEN DE CAMBIO'
        WHEN 4 THEN 'RECIBIDO'
        WHEN 5 THEN 'CERRADO'
        WHEN 6 THEN 'CANCELADO'
    END AS EstadoOrdenCompra,
    A.[DOCDATE] AS FechaDocumento,
    A.[VENDORID] AS IDProveedor,
    A.[VENDNAME] AS NombreProveedor
FROM dbo.POP10100 AS A
INNER JOIN dbo.POP10110 AS B ON A.[PONUMBER] = B.[PONUMBER]
LEFT OUTER JOIN dbo.POP10500 AS C ON B.[PONUMBER] = C.[PONUMBER]
    AND B.[ORD] = C.[POLNENUM]
WHERE (C.POPRCTNM IS NULL OR C.POPRCTNM = '') and A.[POSTATUS] = 1
ORDER BY A.[DOCDATE] DESC;
`;


export const GET_ORDERS_BY_NUMBER = `
    SELECT
        A.[PONUMBER] AS NumeroOrdenCompra,
        CASE A.[POSTATUS]
            WHEN 1 THEN 'NUEVO'
            WHEN 2 THEN 'LIBERADO'
            WHEN 3 THEN 'ORDEN DE CAMBIO'
            WHEN 4 THEN 'RECIBIDO'
            WHEN 5 THEN 'CERRADO'
            WHEN 6 THEN 'CANCELADO'
        END AS EstadoOrdenCompra,
        CASE A.[POTYPE]
            WHEN 1 THEN 'ESTÁNDAR'
            WHEN 2 THEN 'ENVÍO DIRECTO'
            WHEN 3 THEN 'CONTRATO MARCO'
            WHEN 4 THEN 'CONTRATO MARCO - ENVÍO DIRECTO'
        END AS TipoOrdenCompra,
        A.[DOCDATE] AS FechaDocumento,
        A.[PRMDATE] AS FechaPrometida,
        A.[REQDATE] AS FechaRequerida,
        A.[VENDORID] AS IDProveedor,
        A.[VENDNAME] AS NombreProveedor,
        A.[DUEDATE] AS FechaVencimiento,
        B.[ITEMNMBR] AS NumeroArticulo,
        B.[ITEMDESC] AS DescripcionArticulo,
        B.[QTYORDER] AS CantidadOrdenada,
        B.[QTYCANCE] AS CantidadCancelada,
        B.[UNITCOST] AS CostoUnitario,
        B.[EXTDCOST] AS CostoExtendido,
        ISNULL(C.POPRCTNM, ' ') AS NumeroRecepcionCompra,
        ISNULL(C.QTYSHPPD, 0) AS CantidadEnviada,
        ISNULL(C.QTYINVCD, 0) AS CantidadFacturada
    FROM dbo.POP10100 AS A
    INNER JOIN dbo.POP10110 AS B ON A.[PONUMBER] = B.[PONUMBER]
    LEFT OUTER JOIN dbo.POP10500 AS C ON B.[PONUMBER] = C.[PONUMBER]
        AND B.[ORD] = C.[POLNENUM]
    WHERE A.[PONUMBER] = @PONumber
      AND (C.POPRCTNM IS NULL OR C.POPRCTNM = '')
    ORDER BY A.[DOCDATE] DESC
`;

export const FIND_ORDER_BY_NUMBER = `
    SELECT DISTINCT
        A.[PONUMBER] AS NumeroOrdenCompra,
    A.[VENDNAME] AS NombreProveedor
    FROM dbo.POP10100 AS A
        INNER JOIN dbo.POP10110 AS B ON A.[PONUMBER] = B.[PONUMBER]
        LEFT OUTER JOIN dbo.POP10500 AS C ON B.[PONUMBER] = C.[PONUMBER]
        AND B.[ORD] = C.[POLNENUM]
    WHERE (C.POPRCTNM IS NULL OR C.POPRCTNM = '') and A.[POSTATUS] = 1
            AND A.[PONUMBER] LIKE '%' + @searchTerm + '%'
        ORDER BY 1 DESC;
`

